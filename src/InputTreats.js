import React, { useState } from 'react';

const InputTreats = () => {
	const [treats, setTreats] = useState([
		{ id: 1, name: '소고기 ' },
		{ id: 2, name: '오리고기' },
		{ id: 3, name: '고구마' },
	]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(5);

	const handleChange = e => setInputText(e.target.value);
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
		const newList = treats.filter(season => treats.id !== id);
		setTreats(newList);
	};

	const treatsList = treats.map(treats => (
		<div key={treats.id}>
			<li>
				{treats.name}
				<button onClick={() => handleDelete(treats.id)}>delete</button>
			</li>
		</div>
	));

	return (
		<>
			<ul>{treatsList}</ul>
			<input value={inputText} onChange={handleChange} />
			<button onClick={handleClick}>add</button>
		</>
	);
};

export default InputTreats;
