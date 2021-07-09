import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import '../styles/Modal.css';

function OpenGame({ openGame, setOpenGame }) {
	// == notes ==

	// == states | refs | contexts ==
	const [text, setText] = useState('text here');

	// == functions | variables ==

	function onClose() {
		setOpenGame(false);
	}

	const handleChange = (e) => setText(e.target.value);

	// == renders ==
	// if (!openGame) return null;
	return (
		<>
			<div className='open-game-modal'>
				<button className='close-game' onClick={onClose}>
					X
				</button>
				<div className='game-frame'>
					<section className='color-display'></section>

					<form>
						<input
							required
							type='textarea'
							value={text}
							onChange={handleChange}
						/>
					</form>
				</div>
			</div>
		</>
	);
}

export default OpenGame;
