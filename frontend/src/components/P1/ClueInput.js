import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000/');

function ClueInput() {
	const [socket, setSocket] = useState({ message: '', name: '' });
	const [chat, setChat] = useState([]);

	return <div class='clue-input'>hello world</div>;
}

export default ClueInput;
