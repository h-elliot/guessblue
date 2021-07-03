import React from 'react';
import { useFriends } from '../contexts/FriendsProvider';

function Friends() {
	const { friends } = useFriends();

	return (
		<>
			<ul>
				{friends.map((friend) => (
					<li key={friend.id}>{friend.name}</li>
				))}
			</ul>
		</>
	);
}
export default Friends;
