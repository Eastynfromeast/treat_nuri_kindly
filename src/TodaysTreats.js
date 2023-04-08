import React from 'react';
import InputTreats from './InputTreats';

const TodaysTreats = () => {
	// const [treats, setTreats] = useState('');

	function todayIs() {
		let now = new Date();
		let todayYear = now.getFullYear();
		let todayMonth = now.getMonth() + 1;
		let todayDate = now.getDate();
		return todayYear + '.' + todayMonth + '.' + todayDate;
	}
	// const onChange = e => {
	// 	setTreats(e.target.value);
	// };
	return (
		<div id="container">
			<div>
				<h2>{todayIs()}</h2>
				{/* <p> {treats} </p> */}
			</div>
			{/* <input placeholder="간식" onChange={onChange} value={treats} /> */}
			<InputTreats />
			<button id="Btn-submit-treats"> Update </button>
		</div>
	);
};

export default TodaysTreats;
