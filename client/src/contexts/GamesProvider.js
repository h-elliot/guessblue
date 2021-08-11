import React, { useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';
import { useSocket } from './SocketProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children, id }) {
	const [games, setGames] = useLocalStorage('games', []);
	const [selectedGameIndex, setSelectedGameIndex] = useState(0);
	const { friends } = useFriends();
	const socket = useSocket();

	//? =====================================================

	function createGame(partner, partnerName, players, gameId) {
		setGames((prevGames) => {
			return [
				...prevGames,
				{ gameId, players, partner, partnerName, messages: [] },
			];
		});
	}
	for (let i = 0; i < games.length; i++) {
		games[i].index = [i];
	}

	//? =====================================================

	const formattedGames = games.map((game, index) => {
		const messages = game.messages.map((message) => {
			const name = game.partnerName || message.sender;
			const fromMe = id === message.sender; // boolean

			return { ...message, name, fromMe };
		});

		const selected = index === selectedGameIndex;

		return { ...game, messages, selected };
	});

	//? =====================================================

	function deleteGame(gameToDelete) {
		console.log(`gameId: ${gameToDelete}`);
		console.log(`game info: \n ${games.hasOwnProperty()}`);

		const freshNewGames = games.filter(
			(game) => game['gameId'] !== gameToDelete
		);

		setGames(freshNewGames);
	}

	//todo =================================================================
	//todo =================================================================

	const addMessageToConversation = useCallback(
		({ players, text, gameId, sender }) => {
			let gameMatches = false;
			const thisGame = games.find(({ gameId }) => gameId === gameId);

			if (games.find(({ gameId }) => gameId === gameId)) {
				gameMatches = true;
			}

			setGames((prevGames) => {
				const newMessage = { sender, text };

				const newGames = prevGames.map((game) => {
					if (gameMatches) {
						const partner = players.filter((player) => player !== id);
						const partnerName =
							game.partnerName ||
							friends.find((friend) => {
								return friend.name === partner && partner.name;
							});

						return {
							...game,
							partner,
							partnerName,
							gameId,
							messages: [...game.messages, newMessage],
						};
					}
					return game;
				});

				console.log(gameMatches);

				if (gameMatches) {
					return newGames;
				} else {
					return [...prevGames, { players, messages: [newMessage] }];
					// createGame(partner: thisGame.partner, partnerName: thisGame.partnerName, players, gameId);
				}
			});
		},
		[setGames]
	);

	//? =====================================================

	useEffect(() => {
		if (!socket) {
			console.log('🕳️ SOCKET IS NULL');
			return;
		}
		// when the socket receives-message, add it to convo
		socket.on('receive-message', addMessageToConversation);

		return () => socket.off('receive-message');
	}, [socket, addMessageToConversation]);

	//? =====================================================

	// players = [selectedGame.partner, id];
	function sendMessage(players, text, gameId) {
		socket.emit('send-message', { players, text, gameId });

		addMessageToConversation({
			players,
			text,
			gameId,
			sender: id,
		});
	}

	//todo =================================================================
	//todo =================================================================

	const exportValue = {
		games: formattedGames,
		selectedGame: formattedGames[selectedGameIndex],
		sendMessage,
		selectGameIndex: setSelectedGameIndex,
		createGame,
		deleteGame,
	};

	return (
		<GamesContext.Provider value={exportValue}>
			{children}
		</GamesContext.Provider>
	);
}

//todo =================================================================
//todo =================================================================

function arrayEquality(a, b) {
	if (a.length !== b.length) return false;

	a.sort();
	b.sort();

	return a.every((player, index) => {
		return player === b[index];
		// if every element of array A is equal to
		// every element of array B at the same index,
		// the arrays are equal
	});
}
