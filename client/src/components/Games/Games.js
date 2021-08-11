import React from 'react';
import { useGames } from '../../contexts/GamesProvider';

function Games({ setOpenGame }) {
	const { games, selectGameIndex, deleteGame } = useGames();

	function handleClick(e) {
		e.preventDefault();
		selectGameIndex(e.target.value);
		setOpenGame(true);
	}

	function handleDelete(e) {
		e.preventDefault();
		let gameToDelete = e.target.value;

		deleteGame(gameToDelete);
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
								name={game.gameId}
								onClick={handleClick}>
								{game.partnerName}
							</li>
							<button value={game.gameId} onClick={handleDelete}>
								🗑️
							</button>
						</div>
					);
				})}
			</ul>
		</>
	);
}
export default Games;
