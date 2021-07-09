import React from 'react';
import { useGames } from '../../contexts/GamesProvider';

function Games({ setOpenGame }) {
	const { games, selectGameIndex } = useGames();

	function handleClick(e) {
		e.preventDefault();
		console.log('click!');
		selectGameIndex(e.target.value);
		console.log(`${e.target.value} selected!`);
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
