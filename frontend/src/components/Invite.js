//? how do users connect to friends?
//todo	- copy and paste id into friends list

//? how do users start a chat with a friend?
//todo 	- click friend's name to invite to start a game and chat

function Invite() {
	return (
		<div className='invite-friend'>
			<form>
				<label for='new-friend'>invite a friend</label>
				<br />
				<input
					type='text'
					name='new-friend'
					placeholder="enter your friend's id"
				/>
			</form>

			{/* <ul className='added-friends'>
				<li>kevin</li>
				<li>holyhead mary</li>
				<li>wonk</li>
			</ul> */}
		</div>
	);
}
export default Invite;
