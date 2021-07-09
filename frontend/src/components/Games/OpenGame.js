import React, { useState } from 'react';
import { useGames } from '../../contexts/GamesProvider';
import ColorPicker from './InnerGameComponents/ColorPicker';
import ChatHistory from './InnerGameComponents/ChatHistory';
import '../styles/Modal.css';

function OpenGame({ openGame, setOpenGame }) {
	// == notes ==

	// == states | refs | contexts ==
	const [text, setText] = useState('');
	const { games, formattedGames, selectedGame, sendMessage } = useGames();

	// == functions | variables ==

	let yourPartner = selectedGame.name;

	function onClose() {
		setOpenGame(false);
	}

	const handleChange = (e) => setText(e.target.value);

	function handleSubmit(e) {
		e.preventDefault();

		sendMessage(selectedGame.partner, text);
		setText('');
	}

	// == renders ==
	// if (!openGame) return null;
	return (
		<>
			<div className='modal-overlay' />
			<div className='open-game-modal'>
				<header className='game-header'>
					<h4>playing with {yourPartner}</h4>
					<button className='close-game' onClick={onClose}>
						X
					</button>
				</header>
				{/* ======= */}
				<div className='game-frame'>
					<section className='color-display'>
						<ColorPicker />
					</section>
					{/* ======= */}
					<div className='message-display'>
						<ChatHistory />
					</div>
					{/* ======= */}
					<form className='send-message' onSubmit={handleSubmit}>
						<input
							required
							type='textarea'
							value={text}
							onChange={handleChange}
						/>
						<input type='submit' value='send' />
					</form>
				</div>
			</div>
		</>
	);
}

export default OpenGame;
