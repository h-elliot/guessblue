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

	function createGame(partner, players, gameId) {
		const friend = friends.find((friend) => friend.id === partner);

		const partnerName = friend && friend.name;

		console.log(`createGame:`);
		console.log(`gameId- ${gameId}`);
		console.log(`players- ${players}`);
		console.log(`partner- ${partner}`);
		console.log(`partnerName- ${partnerName}`);

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
			const friend = friends.find((friend) => {
				return friend.id === message.sender;
				// "friend" now refers to the friend ID that matches sender
			});

			const name = (friend && friend.name) || message.sender;
			const fromMe = id === message.sender; // boolean

			return { ...message, senderName: name, fromMe };
		});

		const selected = index === selectedGameIndex;
		const gameId = game.gameId;

		return { ...game, gameId, players, messages, selected };
		// [7]
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
			// [1] function receives incoming info about a message
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
					}
					return game;
				});

				if (gameMatches) {
					return newGames;
				} else {
					//* incoming game from friend
					// return all the previous games, along
					// with the new message and players as a new game
					return [...prevGames, { players, messages: [newMessage] }];
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

		addMessageToConversation({ players, text, gameId, sender: id });
	}

	//todo =================================================================
	//todo =================================================================

	const exportValue = {
		// games: formattedGames,
		// selectedGame: formattedGames[selectedGameIndex],
		games,
		selectedGame: games[selectedGameIndex],
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

	return a.every((element, index) => {
		return element === b[index];
		// if every element of array A is equal to
		// every element of array B at the same index,
		// the arrays are equal
	});
}
