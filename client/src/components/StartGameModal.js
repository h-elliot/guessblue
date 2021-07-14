import React, { useRef } from 'react';
import './styles/Modal.css';
// import { useFriends } from '../contexts/FriendsProvider';
// import { useGames } from '../contexts/GamesProvider';

function StartGameModal({ open, onClose }) {
	// == context ==
	// const { friends } = useFriends();
	// const { createNewGame } = useGames();

	// == refs ==
	const nameRef = useRef();
	const idRef = useRef();

	// == states ==
	// const [selectedFriendId, setSelectedFriendId] = useState('');

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

	// == renders ==
	if (!open) return null;

	return (
		<>
			<div className='modal-overlay' />
			<div className='start-game-modal'>
				<button className='close-modal' onClick={onClose}>
					X
				</button>
			</div>
		</>
	);
}
export default StartGameModal;
