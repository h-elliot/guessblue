import React from 'react';
import { useGames } from '../../contexts/GamesProvider';

function Games({ setOpenGame }) {
	const { games, selectedGame, selectGameIndex } = useGames();

	console.log('format games:');
	console.log(games);
	console.log(selectedGame);

	function handleClick(e) {
		e.preventDefault();
		console.log('click!');
		selectGameIndex(e.target.value);
		console.log(`${e.target.value} selected!`);
		setOpenGame(true);
	}

	console.log(`new selectedGame: ${JSON.stringify(selectedGame)}`);
	console.log(`new games array:`);
	console.log(games);

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
