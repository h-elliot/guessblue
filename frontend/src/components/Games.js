import React from 'react';
import { useGames } from '../contexts/GamesProvider';

function Games() {
	const { games, selectGameIndex } = useGames();

	function handleClick(e) {
		e.preventDefault();
		selectGameIndex(e);
	}

	return (
		<>
			<ul>
				{games.map((game) => {
					return (
						<>
							<li key={game.partner} value={game.index} onClick={handleClick}>
								{game.name}
							</li>
							<button>🗑️</button>
						</>
					);
				})}
			</ul>
		</>
	);
}
export default Games;
