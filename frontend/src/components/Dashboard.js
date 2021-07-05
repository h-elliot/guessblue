import React, { useState, useRef } from 'react';
import FriendsList from './FriendsList';
import Game from './Game';
import StartGameModal from './StartGameModal';
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
	const [toggleGameTab, setToggleGameTab] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	// == refs ==
	const nameRef = useRef();

	// == functions ==

	function toggleTab() {
		console.log('toggleTab');
		if (!toggleGameTab) {
			setToggleGameTab(true);
		} else {
			setToggleGameTab(false);
		}
	}

	// == renders ==

	return (
		<div className='dashboard'>
			<container className='dash-main'>
				{toggleGameTab ? <Game /> : <FriendsList />}
			</container>
			<StartGameModal open={isOpen} onClose={() => setIsOpen(false)} />
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
				<wrapper className='footer-tabs'>
					<button
						type='button'
						name='game tab'
						id='big-game-tab'
						onClick={() => toggleTab()}>
						<h3>play</h3>
					</button>
					<button
						type='button'
						name='friends tab'
						id='big-friends-tab'
						onClick={() => toggleTab()}>
						<h3>friends</h3>
					</button>
					<button
						type='button'
						name='new game tab'
						id='small-tab'
						onClick={() => setIsOpen(true)}>
						<h3>new</h3>
					</button>
				</wrapper>
			</footer>
		</div>
	);
}

export default Dashboard;
