import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Hider() {
	return (
		<div className='Hider'>
			<form className='color-guess'>
				<input type='color' value='#ff6347'></input>
			</form>
		</div>
	);
}
export default Hider;
