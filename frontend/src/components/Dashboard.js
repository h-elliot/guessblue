import React, { useState, useEffect } from 'react';
import FriendsList from './FriendsList';
import Game from './Game';
import './styles/Dashboard.css';

function Dashboard({ id }) {
	const [toggleGameTab, setToggleGameTab] = useState(true);

	//! fix id copy-onClick

	function toggleTab() {
		console.log('toggleTab');
		if (!toggleGameTab) {
			setToggleGameTab(true);
		} else {
			setToggleGameTab(false);
		}
	}

	return (
		<div className='dashboard'>
			<>{toggleGameTab ? <Game /> : <FriendsList />}</>
			<footer>
				<div className='id-display'>
					<p>
						your id:
						<span
							onClick={() => {
								navigator.clipboard.writeText(this.state.textToCopy);
							}}>
							{id}
						</span>
					</p>
				</div>
				<wrapper className='footer-tabs'>
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
				</wrapper>
			</footer>
		</div>
	);
}

export default Dashboard;
