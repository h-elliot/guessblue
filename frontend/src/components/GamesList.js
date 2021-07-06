import React, { useRef, useState } from 'react';
import Games from './Games';
import { useFriends } from '../contexts/FriendsProvider';
import { useGames } from '../contexts/GamesProvider';
import './styles/GamesList.css';

function GamesList() {
	// == notes ==
	// == states ==
	const [gamePartnerId, setGamePartner] = useState('');

	// == context ==
	const { friends } = useFriends();
	const { createGame } = useGames();

	// == refs ==
	// const idRef = useRef();

	// == functions ==

	function handleSelect(e) {
		setGamePartner(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		console.log(createGame);

		createGame(gamePartnerId);
	}

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
						<option selected value='pick a friend'>
							pick your favorite friend
						</option>
						{friends.map((friend) => (
							<option value={friend.id} label={friend.name} key={friend.id}>
								{friend.name}
							</option>
						))}
					</select>
					<input type='submit' id='start-game-button' value='🎨' />
				</form>
			</div>
			<h5 id='savior'>gamePartnerId: {gamePartnerId}</h5>
			<div className='games-list'>
				<ul className='created-games'>
					<Games />
				</ul>
			</div>
		</div>
	);
}

export default GamesList;
