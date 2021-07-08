import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children }) {
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
			if (games[i].partner == friends[j].id) {
				const partnerName = friends[j].name;
				games[i].name = partnerName;
				games[i].index = [i];
			}
		}
	}

	console.log(`GAMES:`);
	console.log(games);

	return (
		<GamesContext.Provider value={{ createGame, games, setSelectedGameIndex }}>
			{children}
		</GamesContext.Provider>
	);
}
