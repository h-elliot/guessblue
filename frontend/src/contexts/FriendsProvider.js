import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FriendsContext = React.createContext();

export function useFriends() {
	return useContext(FriendsContext);
}
// the context provider here wraps around all the code that needs to access a user's friends
// everything inside this function wrapper and ALL of their children and grandchildren have access to the parameter passed
// in this case, it's the children inside--the friends stored on local storage
// we're basically using context to pass state to the whole app, while storing that state locally for each user
// to give the app access to this context, i wrapped App() inside of it
export function FriendsProvider({ children }) {
	// save a user's friends in local storage (none by default, haha, losers)
	const [friends, setFriends] = useLocalStorage('friends', []);

	// add a friend to a user's friends-context so guessblue? remembers their many, many beautiful friends
	// a friend requires an id and a name as parameters, and then it adds those to the previous list of friends
	function addFriend(id, name) {
		setFriends((prevFriends) => {
			return [...prevFriends, { id, name }];
		});
	}

	return (
		<FriendsContext.Provider value={{ friends, addFriend }}>
			{children}
		</FriendsContext.Provider>
	);
}
