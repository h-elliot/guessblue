import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children }) {
	const [games, setGames] = useLocalStorage('games', []);
	const { friends } = useFriends();

	function createNewGame(recipient) {
		setGames((prevGames) => {
			return [...prevGames, { recipient, messages: [] }];
		});
	}

	const formattedGames = games.map((game) => {
		const recipient = (recipient) => {
			const friend = friends.find((friend) => {
				return friend.id === recipient;
			});
			const name = (friend && friend.name) || recipient;
			return { id: recipient, name };
		};
		return { ...game, recipient };
	});

	// storing value here to add legibility
	const value = {
		games: formattedGames,
		createNewGame,
	};

	return (
		<GamesContext.Provider value={value}>{children}</GamesContext.Provider>
	);
}
