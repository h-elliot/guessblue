import React from 'react';
import { useGames } from '../contexts/GamesProvider';
import { useFriends } from '../contexts/FriendsProvider';

function Games() {
	const { games } = useGames();
	const { friend } = useFriends();

	// function checkData() {
	// 	checkGameData();
	// }

	return (
		<>
			<ul>
				{games.map((game, index) => {
					return <li key={`${game.gamePartner}`}>{game.gamePartner}</li>;
				})}

				<button className='delete-this'>🗑️</button>
			</ul>
		</>
	);
}
export default Games;
