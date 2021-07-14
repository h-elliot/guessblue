import React, { useState, useEffect } from 'react';

// prefix the key so that we can identify it with our project name if we need to check for it
const PREFIX = 'guessblue-';

// custom hook to use local storage so our IDs and such persist across runs
function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;

	// store the initial value in state so we can save it locally
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);
		if (jsonValue != null) {
			if (jsonValue === 'undefined') {
				return null;
			} else {
				return JSON.parse(jsonValue);
			}
		}
		if (typeof initialValue === 'function') {
			return initialValue();
		} else {
			return initialValue;
		}
	});

	// store the value whenever it changes
	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);
	return [value, setValue];
}

export default useLocalStorage;
