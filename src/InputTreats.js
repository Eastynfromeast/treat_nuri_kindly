import React, { useState, useRef, forwardRef } from 'react';

// 클래스로 변경해보고 싶다
function InputTreats({ getTreatsData }) {
	const [treats, setTreats] = useState([{ id: 1, name: '간식 샘플' }]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(2);

	const onChange = e => setInputText(e.target.value);
	const handleClick = () => {
		const newList = treats.concat({
			id: nextId,
			name: inputText,
		});
		setNextId(nextId + 1);
		setTreats(newList);
		setInputText('');
	};
	const handleDelete = id => {
		const newList = treats.filter(treats => treats.id !== id);
		setTreats(newList);
	};

	const treatsList = treats.map(treats => (
		<li key={treats.id}>
			{treats.name}
			<button onClick={() => handleDelete(treats.id)}>delete</button>
		</li>
	));

	const handleOnKeyPress = e => {
		if (e.key === 'Enter') {
			handleClick();
		}
	};

	getTreatsData(treats);

	return (
		<>
			<ul>{treatsList}</ul>
			<input value={inputText} onChange={onChange} onKeyPress={handleOnKeyPress} placeholder="Type the treats nuri got" />
			<button onClick={handleClick}>add</button>
		</>
	);
}

export default InputTreats;
