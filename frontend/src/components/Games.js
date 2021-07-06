import React from 'react';
import { useGames } from '../contexts/GamesProvider';

function Games() {
	const { games } = useGames();

	return (
		<>
			<ul>
				{/* {games
					? games.map((game, index) => (
							<li key={index}>
								{game.selectedFriendId.name} <span>🗑️</span>
							</li>
					  ))
					: null} */}
			</ul>
		</>
	);
}
export default Games;
