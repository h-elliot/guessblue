import React, { useRef, useEffect } from 'react';
import { useGames } from '../../../contexts/GamesProvider';

function ChatHistory() {
	// == notes ==

	// == states | refs | contexts ==
	const { selectedGame } = useGames();
	const lastMessageRef = useRef();

	// == functions | variables ==

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ smooth: true });
		}
	}, [lastMessageRef.current]);

	return (
		<>
			<div className='messages'>
				{selectedGame.messages.map((message, index) => {
					return (
						<div key={index} className='single-message-container'>
							<div className='single-message-text'>{message.text}</div>
							<div className='single-message-name'>
								{message.fromMe ? 'You' : message.senderName}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
export default ChatHistory;
