import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children, id }) {
	const [games, setGames] = useLocalStorage('games', []);
	const [selectedGameIndex, setSelectedGameIndex] = useState(0);
	const { friends } = useFriends();

	function createGame(partner) {
		console.log(partner);
		setGames((prevGames) => {
			console.log(...prevGames, { partner, messages: [] });
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
		return { ...game, selected };
	});

	console.log(`GAMES:`);
	console.log(games);

	console.log(`formattedGAMES:`);
	console.log(formattedGames);

	// this function [1] receives incoming info about a message,
	// [2] checks if a game exists with the current partner,
	// [2.1] if it matches, add the new message to match partner's messages array
	// [2.2] if it doesnt, create a new game object with the partner, and new message
	function addMessageToConversation({ parter, text, sender }) {
		setGames((prevGames) => {
			let gameMatches = false;
			const partner = parter;
			const newMessage = { sender, text };
			const newGame = prevGames.map((game) => {
				if (game.partner === parter) {
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
	}

	function sendMessage(partner, text) {
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
