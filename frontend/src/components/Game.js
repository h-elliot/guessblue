import React, { useState } from 'react';
import Seeker from './Seeker/Seeker';
import Hider from './Hider/Hider';

function Game() {
	const [seeker, setSeeker] = useState(false);
	return (
		<>
			<div className='game'>
				<h2>the game here</h2>
				<>{seeker ? <Seeker /> : <Hider />}</>
			</div>
		</>
	);
}
export default Game;
