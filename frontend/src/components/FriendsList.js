import React, { useRef } from 'react';
import { useFriends } from '../contexts/FriendsProvider';
import Friends from './Friends';
import './styles/FriendsList.css';

//? how do users connect to friends?
//todo	- copy and paste id into friends list

//? how do users start a chat with a friend?
//todo 	- click friend's name to invite to start a game and chat

//! currently you can add any friend, even if they don't exist

function FriendsList() {
	const idRef = useRef();
	const nameRef = useRef();
	const { addFriend } = useFriends();

	function handleSubmit(e) {
		e.preventDefault();
		// useRef uses the 'current.value' to reflect its content (in the input field) at time of use
		addFriend(idRef.current.value, nameRef.current.value);
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
				</form>
			</div>
			<div className='friends-list'>
				<ul className='added-friends'>
					<Friends />
				</ul>
			</div>
		</div>
	);
}
export default FriendsList;
