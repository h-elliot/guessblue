import React, { useRef, useCallback } from 'react';
import { useGames } from '../../../contexts/GamesProvider';

function ChatHistory() {
	// == notes ==

	// == hooks ==
	const { selectedGame } = useGames();
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	// == functions | variables ==

	return (
		<>
			<div className='messages'>
				{selectedGame.messages.map((message, index) => {
					const lastMessage = selectedGame.messages.length - 1 === index;
					return (
						<div
							ref={lastMessage ? setRef : null}
							key={index}
							className='single-message-container'>
							<div className='single-message-text'>{message.text}</div>
							<div className='single-message-name'>
								{message.fromMe ? 'you' : message.senderName}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
export default ChatHistory;
