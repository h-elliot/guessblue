import React, { useState } from 'react';
import { useGames } from '../../contexts/GamesProvider';
import ColorPicker from './InnerGameComponents/ColorPicker';
import ChatHistory from './InnerGameComponents/ChatHistory';
import '../styles/Modal.css';

function OpenGame({ openGame, setOpenGame }) {
	// == notes ==

	// == hooks ==
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
				<button className='close-game' onClick={onClose}>
					X
				</button>
				<header className='game-header'>
					<h4 className='game-header'>playing with {yourPartner}</h4>
					<h5 className='game-header'>it's a color conspiracy!</h5>
				</header>
				{/* ======= */}
				<section className='color-display'>
					<ColorPicker />
				</section>
				{/* ======= */}
				{/* <div className='message-display'> */}
				<ChatHistory />
				{/* </div> */}
				{/* ======= */}
				<div className='footer-form'>
					<form className='send-message' onSubmit={handleSubmit}>
						<input
							className='textbox'
							required
							type='textarea'
							value={text}
							onChange={handleChange}
						/>
						<button className='send-button' type='submit' value='>' />
					</form>
				</div>
			</div>
		</>
	);
}

export default OpenGame;
