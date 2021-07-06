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

	function createGame(gamePartner) {
		console.log(gamePartner);
		setGames((prevGames) => {
			console.log(...prevGames, { gamePartner, messages: [] });
			return [...prevGames, { gamePartner, messages: [] }];
		});
	}

	// create more readable games

	const formattedGames = gamesMap.prototype.get();

	const value = {
		games: games,
		createGame,
		formattedGames,
	};

	return (
		<GamesContext.Provider value={{ createGame, games }}>
			{children}
		</GamesContext.Provider>
	);
}
