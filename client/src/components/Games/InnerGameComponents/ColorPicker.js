import React, { useState } from 'react';
import { SliderPicker } from 'react-color';
import '../../styles/ColorPicker.css';

function ColorPicker() {
	// == notes ==

	// == states | refs | contexts ==
	const [color, setColor] = useState('#40e0d0');

	// == functions | variables ==

	function handleChange(color, e) {
		console.log('color changing...');
		setColor({ background: color.hex });
		whichColor();
	}

	function whichColor() {
		console.log(color.background);
	}

	// == renders ==
	return (
		<div className='custom-picker'>
			<div className='color-block' />
			<SliderPicker color={color} onChangeComplete={handleChange} />
		</div>
	);
}
export default ColorPicker;
