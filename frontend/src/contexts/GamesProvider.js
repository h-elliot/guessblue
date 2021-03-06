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

	function createGame(partner) {
		setGames((prevGames) => {
			if (prevGames.includes(partner)) {
				console.log('Sorry, you already have a game with them.');
				// launch game?
				return;
			}
			return [...prevGames, { partner, messages: [] }];
		});
	}

	for (let i = 0; i < games.length; i++) {
		for (let j = 0; j < friends.length; j++) {
			if (games[i].partner === friends[j].id) {
				const partnerName = friends[j].name;
				games[i].name = partnerName;
				games[i].index = [i];
			}
		}
	}

	const formattedGames = games.map((game, index) => {
		const selected = index === selectedGameIndex;
		const messages = game.messages.map((message) => {
			const friend = friends.find((friend) => {
				return friend.id === message.sender;
			});
			const name = (friend && friend.name) || message.sender;
			const fromMe = id === message.sender;
			return { ...message, senderName: name, fromMe };
		});

		return { ...game, messages, selected };
	});

	// this function [1] receives incoming info about a message,
	// [2] checks if a game exists with the current partner,
	// [2.1] if it matches, add the new message to match partner's messages array
	// [2.2] if it doesnt, create a new game object with the partner, and new message
	const addMessageToConversation = useCallback(
		({ partner, text, sender }) => {
			console.log(`📟 ${JSON.stringify(text)}`); // works
			setGames((prevGames) => {
				let gameMatches = false;
				const newMessage = { sender, text };
				const newGame = prevGames.map((game) => {
					if (game.partner === partner) {
						gameMatches = true;
						return {
							...game,
							messages: [...game.messages, newMessage],
						};
					}
					return game;
				});

				if (gameMatches) {
					return newGame;
				} else {
					// if gameMatches is false
					return [...prevGames, { partner, messages: [newMessage] }];
				}
			});
		},
		[setGames]
	);

	useEffect(() => {
		if (socket == null) {
			console.log('🕳️ SOCKET IS NULL');
			return;
		}
		socket.on('receive-message', addMessageToConversation);

		return () => socket.off('receive-message');
	}, [socket, addMessageToConversation]);

	function sendMessage(partner, text) {
		socket.emit('send-message', { partner, text });

		addMessageToConversation({ partner, text, sender: id });
	}

	const exportValue = {
		games: formattedGames,
		selectedGame: formattedGames[selectedGameIndex],
		sendMessage,
		selectGameIndex: setSelectedGameIndex,
		createGame,
	};

	return (
		<GamesContext.Provider value={exportValue}>
			{children}
		</GamesContext.Provider>
	);
}
