import React from 'react';
import { useGames } from '../contexts/GamesProvider';

function Games() {
	const { games, selectGameIndex } = useGames();

	return (
		<>
			<ul>
				{/* {games.map((game) => {
					return (
						<>
							<li key={game.partner} onClick={() => selectGameIndex(index)}>
								{game.name}
							</li>
							<button>🗑️</button>
						</>
					);
				})} */}
			</ul>
		</>
	);
}
export default Games;
