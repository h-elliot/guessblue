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

	function createGame(selectedFriendId) {
		console.log('createGame selectedFriendId: ' + selectedFriendId);
		const friendId = friends.selectedFriendId;
		console.log('createGame friendId: ' + friendId);
		setGames((prevGames) => {
			return [...prevGames, { selectedFriendId, messages: [] }];
		});
	}

	const formattedGames = games.map((game) => {
		const selectedFriendId = () => {
			const friendId = friends.find((friend) => {
				return friend.id === selectedFriendId;
			});
			const friendName = (friendId && friendId.name) || selectedFriendId;
			return { id: selectedFriendId, friendName };
		};
		return { ...game, selectedFriendId };
	});

	// storing value here to add legibility
	const value = {
		games: formattedGames,
		createGame,
	};

	return (
		<GamesContext.Provider value={value}>{children}</GamesContext.Provider>
	);
}
