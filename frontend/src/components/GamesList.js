import React, { useState } from 'react';
import Games from './Games';
import { useFriends } from '../contexts/FriendsProvider';
import { useGames } from '../contexts/GamesProvider';
import './styles/GamesList.css';

function GamesList() {
	// == notes ==

	// == states ==
	const [gamePartnerId, setGamePartnerId] = useState([]);

	// == context ==
	const { friends } = useFriends();
	const { createGame } = useGames();

	// == refs ==

	// == functions ==

	const handleChange = (e) => {
		console.clear();
		console.log(`e.target.value: ${e.target.value}`);
		console.log(`friends string: ${JSON.stringify(friends)}`);
		const friendName = friends.filter(function (friend) {
			return friend.name == e.target.value;
		});
		console.log(`friendName: ${JSON.stringify(friendName)}`);
		setGamePartnerId(e.target.value);

		console.log('gamePartnerId: ' + gamePartnerId);
	};

	function handleSubmit(e) {
		e.preventDefault();

		createGame(gamePartnerId);
	}

	// const friendsMap = friends.map((friend) => (id: friend.id, name: friend.name));

	// == renders ==

	return (
		<div className='games'>
			<div className='start-game'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='choose-friend' id='new-game-label'>
						start a game with a click ➔
					</label>
					<select onChange={handleChange}>
						<option defaultValue='pick a friend' name='default' id='default'>
							pick a friend
						</option>
						{friends.map((friend) => (
							<option
								key={friend.name}
								value={friend.id}
								label={friend.name}
								name={friend.name}
								id={friend.id}>
								{friend.name}
							</option>
						))}
					</select>
					<input type='submit' id='start-game-button' value='🎨' />
				</form>
			</div>
			<div className='games-list'>
				<ul className='created-games'>
					<Games />
				</ul>
			</div>
		</div>
	);
}

export default GamesList;
