import React, {useContext, useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

const FriendsContext = React.createContext()

function useFriends() {
	return userContext(FriendsContext)
}

function FriendsProvider( {children} ) {
	// save a user's friends in local storage (none by default, haha, losers)
	const [friends, setFriends] = useLocalStorage('friends', [])

	// add a friend to a user's friends-context so guessblue? remembers their many, many beautiful friends
	// a friend requires an id and a name as parameters, and then it adds those to the previous list of friends
	function addFriend(id, name) {
		setFriends(prevFriends => {
			return [...prevFriends, {id, name}]
		})
	}

	return (
		<FriendsContext.Provider value={{friends, addFriend}}>
			{children}
		</FriendsContext.Provider>
	)
}

export function FriendsProvider();
export function useFriends();
