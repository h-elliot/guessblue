import './fonts.css';
import './App.css';
import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
	const [player, setPlayer] = useState('');
	const [id, setId] = useLocalStorage('id');

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<main>
				<>{id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />}</>
			</main>
		</div>
	);
}

export default App;
