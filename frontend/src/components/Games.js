import React from 'react';
import { useGames } from '../contexts/GamesProvider';
import { useFriends } from '../contexts/FriendsProvider';

function Games() {
	const { games, consoleCheck } = useGames();
	const { friends } = useFriends();

	const gamePartnerDisplay = games.slice();

	function consoleThatShit() {
		console.clear();
		consoleCheck();

		// console.log(`Object.keys(games):`);
		// console.log(Object.keys(games));
		// console.log(`Object.values(games):`);
		// console.log(Object.values(games));
		// console.log(`Object.entries(games):`);
		// console.log(Object.entries(games));
	}

	return (
		<>
			<ul>
				{games.map((game) => {
					return <li key={game.gamePartner}>{game.gamePartner} 🗑️</li>;
				})}
			</ul>
			<button onClick={consoleThatShit}>👾🔭</button>
			{/* <h4>{gamePartnerDisplay}</h4> */}
		</>
	);
}
export default Games;
