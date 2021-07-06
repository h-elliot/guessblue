import React, { useContext } from 'react';
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

	//* -----------------------
	//? game.gamePartner.map --
	//! TypeError: game.gamePartner.map is not a function
	//* -- -- -- -- -- -- -- --
	//? games.gamePartner.map -
	//! TypeError: games.gamePartner is undefined
	//* -----------------------

	// const formattedGames = games.map((game) => {
	// 	const gamePartner = game.gamePartner.forEach((gamePartner) => {
	// 		const friend = friends.find((friend) => {
	// 			return friend.id === gamePartner;
	// 		});
	// 		const name = (friend && friend.name) || gamePartner;
	// 		return { id: gamePartner, name };
	// 	});
	// 	return { ...game, gamePartner };
	// });

	return (
		<GamesContext.Provider value={{ createGame, games }}>
			{children}
		</GamesContext.Provider>
	);
}
