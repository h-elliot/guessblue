import React, { useState } from 'react';
import './styles/Footer.css';

function Footer({ toggleTab }) {
	return (
		<footer>
			<button
				type='button'
				name='game tab'
				className='game-tab'
				onClick={() => toggleTab}>
				<h3>game</h3>
			</button>
			<button
				type='button'
				name='friends tab'
				className='friends-tab'
				onClick={() => toggleTab}>
				<h3>friends</h3>
			</button>
		</footer>
	);
}
export default Footer;
