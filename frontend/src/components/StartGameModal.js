import React, { useState, useRef } from 'react';
import { useFriends } from '../contexts/FriendsProvider';
import './styles/Modal.css';

function StartGameModal({ open, children, onClose }) {
	const [selectedFriendIds, setSelectedFriendIds] = useState([]);
	const { friends } = useFriends();

	const nameRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
	}

	// this function takes in the friend id, sets the state of selected friend ids to (whatever is just was, including 0, plus the new id IF )
	function handleCheckChange(friendId) {
		setSelectedFriendIds((prevSelectedFriendIds) => {
			if (prevSelectedFriendIds.includes(friendId)) {
				return prevSelectedFriendIds.filter((prevId) => {
					return friendId !== prevId;
				});
			} else {
				return [...prevSelectedFriendIds, friendId];
			}
		});
	}

	if (!open) return null;

	return (
		<>
			<div className='modal-overlay' />
			<div className='start-game-modal'>
				<button className='close-modal' onClick={onClose}>
					X
				</button>
				{children}
				{/* <h4 ref={nameRef}>start a new game</h4> */}
				{/* {friends.map((friend) => (
				<form onSubmit={handleSubmit}>
					<input
						type='checkbox'
						value={selectedFriendIds.includes(friend.id)}
						label={friend.name}
						onChange={handleCheckChange(friend.id)}
					/>
				</form>
			))} */}
			</div>
		</>
	);
}
export default StartGameModal;
