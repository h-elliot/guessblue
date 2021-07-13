import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles/Login.css';

function Login({ onIdSubmit }) {
	const idRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();

		onIdSubmit(idRef.current.value);
	}

	function createNewId(e) {
		onIdSubmit(uuidv4());
	}
	return (
		<div className='login'>
			<form onSubmit={handleSubmit}>
				<label for='name'>
					<b>name</b>
				</label>
				<br />
				<input
					type='text'
					placeholder='whatever you want'
					name='name'
					required></input>{' '}
				<br />
				<label for='id'>
					<b>id</b>
				</label>
				<br />
				<input
					type='text'
					placeholder='a bunch of special letters and numbers'
					name='id'
					ref={idRef}
					required></input>
				<br />
				{/* <input type='submit' value='login'></input>{' '} */}
				<input onClick={createNewId} type='button' value='new ID' />
			</form>
		</div>
	);
}
export default Login;
