import React from 'react';
import { useGames } from '../../contexts/GamesProvider';

function Games({ setOpenGame }) {
	const { games, selectGameIndex } = useGames();

	function handleClick(e) {
		e.preventDefault();
		selectGameIndex(e.target.value);
		setOpenGame(true);
	}

	return (
		<>
			<ul>
				{games.map((game) => {
					return (
						<div className='created-games'>
							<li
								key={game.partner}
								value={game.index}
								name={game.name}
								onClick={handleClick}>
								{game.name}
							</li>
							<button>🗑️</button>
						</div>
					);
				})}
			</ul>
		</>
	);
}
export default Games;
