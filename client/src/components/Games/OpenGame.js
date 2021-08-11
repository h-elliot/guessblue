import React, { useState } from 'react';
import { useGames } from '../../contexts/GamesProvider';
import ColorPicker from './InnerGameComponents/ColorPicker';
import ChatHistory from './InnerGameComponents/ChatHistory';
import '../styles/Modal.css';

function OpenGame({ openGame, setOpenGame, id }) {
	// == notes ==

	// == hooks ==
	const [text, setText] = useState('');
	const { selectedGame, sendMessage } = useGames();

	// == functions | variables ==

	let yourPartner = selectedGame ? selectedGame.partnerName : null;

	function closeGame() {
		setOpenGame(false);
	}

	const handleChange = (e) => setText(e.target.value);

	function handleSubmit(e) {
		e.preventDefault();

		// WDS-Kyle uses map() on the players (recipients) but we only have a 2 player game
		const players = [selectedGame.partner, id];

		sendMessage(players, text, selectedGame.gameId);
		setText('');
	}

	// == renders ==
	if (!openGame) return null;
	return (
		<>
			<div className='modal-overlay' onClick={closeGame} />
			<div className='open-game-modal'>
				{/* <button className='close-game' onClick={closeGame}>
					X
				</button> */}
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
						<button className='send-button' type='submit' value='send' />
					</form>
				</div>
			</div>
		</>
	);
}

export default OpenGame;
