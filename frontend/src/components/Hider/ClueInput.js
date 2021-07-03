import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import '../styles/Clues.css';
import useChatRoom from '../useChatRoom';
const ENDPOINT = 'https://127.0.0.1:4000';

function ClueInput() {
	const [response, setResponse] = useState('');

	// connect to the socket server:
	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on('NEW_MESSAGE_EVENT', (data) => {
			setResponse(data);
		});

		// clean up
		return () => socket.disconnect();
		//
	}, []);

	return (
		<container className='clue-input'>
			<div className='chat'></div>
			<form>
				<label for='name'>name: </label>
				<br />
				<input name='clue' type='text' id='name'></input>
				<br />
				<label for='message'>clues: </label> <br />
				<input name='clue' type='textarea' id='message'></input>
			</form>
		</container>
	);
}

export default ClueInput;
