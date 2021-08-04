import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Games from './Games';
import { useFriends } from '../../contexts/FriendsProvider';
import { useGames } from '../../contexts/GamesProvider';
import '../styles/GamesList.css';

function GamesList({ setOpenGame, id }) {
	// == notes ==

	// == hooks ==
	const { friends } = useFriends();
	const { games, createGame } = useGames();
	const [selectedFriendId, setSelectedFriendId] = useState('');

	// == functions | variables ==

	function handleSelect(e) {
		setSelectedFriendId(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		const gameId = nanoid();
		const partner = selectedFriendId;
		const friend = friends.find((friend) => friend.id === partner);
		const partnerName = friend && friend.name;
		const players = [selectedFriendId, id];
		players.sort();

		console.log(`players: ${players}`);

		let duplicateGame = false;

		for (let i = 0; i < games.length; i++) {
			if (games[i].players === players) {
				duplicateGame = true;
				console.log('Sorry, you already have a game with them.');
				break;
			}
		}

		if (!duplicateGame) {
			createGame(partner, partnerName, players, gameId);
		}
	} // closes handleSubmit

	// == renders ==

	return (
		<div className='games'>
			<div className='start-game'>
				<form onSubmit={handleSubmit}>
					<label for='choose-friend' id='new-game-label'>
						start a new game with your bud{' '}
					</label>
					<select
						name='choose-friend'
						id='choose-friend'
						onChange={handleSelect}>
						<option defaultValue='pick a friend'>which bud?</option>
						{friends.map((friend) => (
							<option value={friend.id} label={friend.name} key={friend.id}>
								{friend.name}
							</option>
						))}
					</select>
					<input type='submit' id='start-game-button' value='🎨' />
				</form>
			</div>
			<div className='games-list'>
				<ul className='created-games'>
					<Games setOpenGame={setOpenGame} />
				</ul>
			</div>
		</div>
	);
}

export default GamesList;
