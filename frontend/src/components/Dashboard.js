import React, { useState } from 'react';
import FriendsList from './FriendsList';
import GamesList from './GamesList';
import './styles/Dashboard.css';
import './styles/Modal.css';

//? how do users start a game?
//	- click 'new game' in footer if state of game is falsey

//? how do users connect to friends?
//	- copy and paste id into friends list

function Dashboard({ id }) {
	// == notes ==
	//! fix modal infinite loop!
	//! fix id copy-onClick

	// == state ==
	const [toggleTab, setToggleTab] = useState(true);

	// == refs ==

	// == functions ==

	// == renders ==

	return (
		<div className='dashboard'>
			<div className='dash-main'>
				{toggleTab ? <GamesList /> : <FriendsList />}
			</div>
			<footer>
				<div className='id-display'>
					<p>
						your id:
						<span
							className='id-span'
							//! fix id copy-onClick
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
