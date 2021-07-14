import React, { useRef, useState } from 'react';
import { useFriends } from '../../contexts/FriendsProvider';
import Friends from './Friends';
import '../styles/FriendsList.css';

function FriendsList() {
	// == notes ==
	//! currently you can add any friend, even if they don't exist

	// == hooks ==
	const idRef = useRef();
	const nameRef = useRef();
	const { friends, addFriend, deleteFriend, updateNickname } = useFriends();
	// i want a state to update in order to rerender the friends map
	const [updatedNickname, setUpdatedNickname] = useState(false);

	// == functions | variables ==

	const allIds = friends.map((friend) => friend.id);

	function handleSubmit(e) {
		e.preventDefault();
		// useRef uses the 'current.value' to reflect its content (in the input field) at time of use
		let id = idRef.current.value;
		let name = nameRef.current.value;
		console.log(`id: ${id}\nname: ${name}`);

		// console.log(allIds.includes(id));
		if (allIds.includes(id)) {
			updateNickname(id, name);
			if (updatedNickname) {
				setUpdatedNickname(false);
			} else {
				setUpdatedNickname(true);
				return;
			}
		} else {
			addFriend(id, name);
		}
	}

	function checkUnique(id) {
		console.log(`allIds: \n${allIds}`);
	}

	function handleDelete(e) {
		e.preventDefault();

		deleteFriend(idRef.current.value);
	}

	return (
		<div className='friends'>
			<div className='invite-friend'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='new-friend-id' id='id-label'>
						friend's id:
					</label>
					<input
						type='text'
						name='new-friend-id'
						id='new-friend-id'
						placeholder="enter your friend's id"
						ref={idRef}
						required
					/>

					<br />
					<label htmlFor='new-friend-name' id='name-label'>
						nickname:
					</label>
					<input
						type='text'
						name='new-friend-name'
						id='new-friend-name'
						placeholder='enter a nickname'
						ref={nameRef}
						required
					/>

					<input type='submit' id='submit-new-friend' value='+' />
					<button id='delete-friend' onClick={handleDelete}>
						-
					</button>
				</form>
			</div>
			<div className='friends-list'>
				<ul className='added-friends'>
					<Friends />
				</ul>
				<button onClick={checkUnique}>?</button>
			</div>
		</div>
	);
}
export default FriendsList;
