import React, { useState } from 'react';
import Seeker from './Seeker/Seeker';
import Hider from './Hider/Hider';
import Clues from './Clues';

//todo: make background color = randomly assigned game color
//todo: make text color legible against any bg color (mix-blend-mode css)
//? https://css-tricks.com/almanac/properties/m/mix-blend-mode/

// == notes ==

// == context ==

// == refs ==

// == states ==

// == functions ==

// == renders ==

function Game() {
	const [seeker, setSeeker] = useState(false);

	return (
		<>
			<section className='chatbox'>
				<Clues />
			</section>
			<div className='game'>
				<h2>the game here</h2>
				<>{seeker ? <Seeker /> : <Hider />}</>
			</div>
		</>
	);
}
export default Game;
