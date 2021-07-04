import React, { useState } from 'react';

function Clues() {
	const [hider, setHider] = useState(true);

	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<>
			<div className='clues'>
				<container className='clue-display'></container>
				<form className='clue-input' onSubmit={handleSubmit}>
					<label for='send-message' id='send-message-label'>
						{hider ? <small>clue: </small> : <small>reply: </small>}
					</label>
					<input
						type='text'
						name='send-message'
						id='send-message'
						placeholder='no color names!'
					/>
					<input type='submit' id='submit-message' value='>' />
				</form>
			</div>
		</>
	);
}
export default Clues;
