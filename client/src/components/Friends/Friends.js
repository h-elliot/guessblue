import React, { useState, useEffect } from 'react';
import { useFriends } from '../../contexts/FriendsProvider';

function Friends() {
	const { friends } = useFriends();

	return (
		<>
			<ul>
				{friends.map((friend) => (
					<li key={friend.id}>
						{friend.name} <sub>{friend.id}</sub>
					</li>
				))}
			</ul>
		</>
	);
}
export default Friends;
