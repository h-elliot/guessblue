import React, { useState, useEffect } from 'react';
import FriendsList from './FriendsList';
import Game from './Game';
import './styles/Footer.css';

function Dashboard({ id }) {
	const [toggleGameTab, setToggleGameTab] = useState(true);

	function toggleTab() {
		console.log('toggleTab');
		if (!toggleGameTab) {
			setToggleGameTab(true);
		} else {
			setToggleGameTab(false);
		}
	}

	return (
		<div>
			{id}
			<>{toggleGameTab ? <Game /> : <FriendsList />}</>
			<footer>
				<button
					type='button'
					name='game tab'
					className='game-tab'
					onClick={() => toggleTab()}>
					<h3>game</h3>
				</button>
				<button
					type='button'
					name='friends tab'
					className='friends-tab'
					onClick={() => toggleTab()}>
					<h3>friends</h3>
				</button>
			</footer>
		</div>
	);
}

export default Dashboard;
