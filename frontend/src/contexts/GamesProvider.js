import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children }) {
	// 'games' is the key for the games context, the value is an array of objects containing the gamePartner:id  and messages= []
	const [games, setGames] = useLocalStorage('games', []);
	const { friends } = useFriends();

	function createGame(gamePartner) {
		setGames((prevGames) => {
			return [...prevGames, { gamePartner, messages: [] }];
		});
	}

	//! untested
	// function deleteGame(id) {
	// 	const index = games.indexOf(id.value);
	// 	if (index) {
	// 		games.splice(index, 1);
	// 	}
	// }

	const formattedGames = games.map((game) => {
		// const gamePartner = game.gamePartner.map((gamePartner) => {
		// 	const friend = friends.find((friend) => {
		// 		return friend.id === gamePartner;
		// 	});
		// 	const name = (friend && friend.name) || gamePartner;
		// 	return { id: gamePartner, name };
		// });
		// return { ...game, gamePartner };
	});

	// storing value here to add legibility
	const value = {
		games: createGame,
		formattedGames,
	};

	return (
		<GamesContext.Provider value={value}>{children}</GamesContext.Provider>
	);
}
