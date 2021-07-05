import React from 'react';
import { useFriends } from '../contexts/FriendsProvider';
import { useGames } from '../contexts/GamesProvider';

function GamesList() {
	const { friends } = useFriends();
	const { games } = useGames();

	return (
		<>
			<ul>
				{games.map((game, index) => (
					<li key={index}>{game.recipient}</li>
				))}
			</ul>
		</>
	);
}
