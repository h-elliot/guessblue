import React, { useState, useRef } from 'react';
import { useFriends } from '../contexts/FriendsProvider';
import './styles/Modal.css';
import { useGames } from '../contexts/GamesProvider';

function StartGameModal({ open, onClose }) {
	// == context ==
	const { friends } = useFriends();
	const { createNewGame } = useGames();

	// == refs ==
	const nameRef = useRef();
	const idRef = useRef();

	// == states ==
	const [selectedFriendId, setSelectedFriendId] = useState('');

	// == functions ==

	//* this function takes in the friend id, sets the state of selected friend ids to (whatever is just was, including 0, plus the new id IF it's not already in the list. if it is, remove it actually)
	function handleChange(friendId) {
		setSelectedFriendId(friendId);
	}
	// 		(prevSelectedFriendIds) => {
	// 		if (prevSelectedFriendIds.includes(friendId)) {
	// 			return prevSelectedFriendIds.filter((prevId) => {
	// 				return friendId !== prevId;
	// 			});
	// 		} else {
	// 			return [...prevSelectedFriendIds, friendId];
	// 		}
	// 	});
	// }

	function handleSubmit(e) {
		e.preventDefault();

		createNewGame(selectedFriendId);
		onClose();
	}

	// == renders ==
	if (!open) return null;

	return (
		<>
			<div className='modal-overlay' />
			<div className='start-game-modal'>
				<button className='close-modal' onClick={onClose}>
					X
				</button>

				<h4>start a new game</h4>
				<form onSubmit={handleSubmit}>
					<select type='text' id='choose-friend'>
						{friends.map((friend) => (
							<option
								value={friend.id}
								onChange={handleChange}
								aria-label={friend.name}
								ref={idRef}
								key={friend.id}>
								{friend.name}
							</option>
						))}
					</select>
					<button type='submit'>let's play!</button>
				</form>
			</div>
		</>
	);
}
export default StartGameModal;
