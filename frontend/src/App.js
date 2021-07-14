import './fonts.css';
import './App.css';
import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/header comps/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { FriendsProvider } from './contexts/FriendsProvider';
import { GamesProvider } from './contexts/GamesProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {
	// console.clear();
	const [id, setId] = useLocalStorage('id');

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	// everything in our dashboard has the friends/games context now bc we're providing it here
	const dashboard = (
		<SocketProvider id={id}>
			<FriendsProvider>
				<GamesProvider id={id}>
					<Dashboard id={id} />
				</GamesProvider>
			</FriendsProvider>
		</SocketProvider>
	);
	// the id we're passing in above ^ is our own

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<main>
				<>{id ? dashboard : <Login onIdSubmit={setId} />}</>
			</main>
		</div>
	);
}

export default App;
