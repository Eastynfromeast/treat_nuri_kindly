import React, { useState } from 'react';

function InputTest() {
	const [text, setText] = useState('');

	const onChange = e => {
		setText(e.target.value);
	};
	const onReset = e => {
		setText('');
	};
	// const [inputs, setInputs] = useState({ name: '' });
	// const { name } = inputs;

	// const onChange = e => {
	// 	const { value, name } = e.target;
	// 	setInputs({
	// 		...inputs, // spread 문법
	// 		[name]: value,
	// 	});
	// };

	// const onReset = () => {
	// 	setInputs({ name: '' });
	// };

	return (
		<div>
			<input placeholder="이름" onChange={onChange} value={text} />
			<button onClick={onReset}> 초기화 </button>
			<div>
				<b> 값 : {text} </b>
				{/* {name} */}
			</div>
		</div>
	);
}

export default InputTest;
