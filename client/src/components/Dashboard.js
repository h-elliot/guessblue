import React, { useState } from 'react';
import FriendsList from './Friends/FriendsList';
import GamesList from './Games/GamesList';
import OpenGame from './Games/OpenGame';
import { useGames } from '../contexts/GamesProvider';
import './styles/Dashboard.css';
import './styles/Modal.css';

function Dashboard({ id }) {
	// == notes ==
	//! fix id copy-onClick

	// == states | refs | contexts ==
	const { selectedGame } = useGames();
	const [toggleTab, setToggleTab] = useState(false);
	const [openGame, setOpenGame] = useState(false);
	// == functions | variables ==

	// == renders ==

	return (
		<div className='dashboard'>
			<OpenGame openGame={openGame} setOpenGame={setOpenGame} />

			<div className='dash-main'>
				{toggleTab ? <GamesList setOpenGame={setOpenGame} /> : <FriendsList />}
			</div>
			<footer>
				<div className='id-display'>
					<p>
						your id:{' '}
						<span
							className='id-span'
							// onClick={() => {
							// 	navigator.clipboard.writeText(this.state.textToCopy);
							// }}
						>
							{id}
						</span>
					</p>
				</div>
				<div className='footer-tabs'>
					<button
						type='button'
						name='game tab'
						id='big-game-tab'
						onClick={() => setToggleTab(true)}>
						<h3>games</h3>
					</button>
					<button
						type='button'
						name='friends tab'
						id='big-friends-tab'
						onClick={() => setToggleTab(false)}>
						<h3>friends</h3>
					</button>
				</div>
			</footer>
		</div>
	);
}

export default Dashboard;
