import React, { useRef, useState } from 'react';
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

	const [added, setAdded] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		addFriend(idRef.current.value, nameRef.current.value);
	}

	return (
		<div className='friends'>
			<div className='invite-friend'>
				<form onSubmit={handleSubmit}>
					<label for='new-friend-id' id='id-label'>
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
					<label for='new-friend-name' id='name-label'>
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
					{added ? <p>added!</p> : null}
				</form>
			</div>
			<container className='friends-list'>
				<ul className='added-friends'>
					<Friends />
				</ul>
			</container>
		</div>
	);
}
export default FriendsList;
