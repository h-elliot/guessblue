import React from 'react';
import { useGames } from '../contexts/GamesProvider';

function Games() {
	const { games } = useGames();

	return (
		<>
			<ul>
				{games.map((game, index) => (
					<li key={index}>{game.selectedFriendId.name}</li>
				))}
			</ul>
		</>
	);
}
export default Games;
