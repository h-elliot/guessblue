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
		console.log(`createGame:`);
		console.log(`gameId- ${gameId}`);
		console.log(`players- ${players}`);
		console.log(`partner- ${partner}`);

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
			console.log(`📟 ${sender} to game ${gameId}: \n${JSON.stringify(text)}`); //✅

			setGames((prevGames) => {
				let gameMatches = false;
				const newMessage = { sender, text };

				const newGames = prevGames.map((game) => {
					// for each of the games, check if the players match
					if (arrayEquality(game.players, players)) {
						gameMatches = true;
						return {
							...game,
							messages: [...game.messages, newMessage],
						};
						//! new created game is not formatted correctly
						//todo: maybe create new function to handle this
					}
					return game;
				});

				if (gameMatches) {
					return newGames;
				} else {
					return [...prevGames, { players, messages: [newMessage] }];
				}
			});
		},
		[setGames]
	);

	// function incomingGameHandler({ players, text, gameId, sender }) {
	// 	const newMessage = { sender, text };
	// 	return [...prevGames, { players, messages: [newMessage] }];
	// }

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

		addMessageToConversation({ players, text, gameId, sender: id });
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
