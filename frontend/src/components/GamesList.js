import React, { useRef, useState } from 'react';
import Games from './Games';
import { useFriends } from '../contexts/FriendsProvider';
import { useGames } from '../contexts/GamesProvider';
import './styles/GamesList.css';

function GamesList() {
	// == notes ==
	// this.handleSelect = this.handleSelect.bind(this);
	// == states ==
	const [gamePartnerId, setGamePartnerId] = useState('');
	const [gamePartnerName, setGamePartnerName] = useState('');

	// == context ==
	const { friends } = useFriends();
	const { createGame } = useGames();

	// == refs ==

	// == functions ==

	const handleSelect = (e) => {
		setGamePartnerId(e.target.value);
		setGamePartnerName(e.target.name);
		console.clear();
		console.log(gamePartnerId, gamePartnerName);
	};

	function handleSubmit(e) {
		e.preventDefault();

		console.log(`submit e.target`);
		console.log(e.target);
		console.log(`gamePartnerId:`);
		console.log(gamePartnerId);
		console.log(`gamePartnerName:`);
		console.log(gamePartnerName);

		// createGame(gamePartnerId);
	}

	// function consoleThatShit() {}

	// == renders ==

	return (
		<div className='games'>
			<div className='start-game'>
				<form onSubmit={handleSubmit}>
					<label for='choose-friend' id='new-game-label'>
						start a game with a click ➔
					</label>
					<select onChange={handleSelect}>
						<option selected value='pick a friend' name='default' id='default'>
							pick a friend
						</option>
						{friends.map((friend) => (
							<option
								value={friend.id}
								name={friend.name}
								id={friend.id}
								label={friend.name}
								key={friend.id}>
								{friend.name}
							</option>
						))}
					</select>
					<input type='submit' id='start-game-button' value='🎨' />
				</form>
			</div>
			<h5 id='savior'>
				gamePartnerId: {gamePartnerId} | gamePartnerName: {gamePartnerName}
			</h5>
			<div className='games-list'>
				<ul className='created-games'>
					<Games />
				</ul>
			</div>
		</div>
	);
}

export default GamesList;
