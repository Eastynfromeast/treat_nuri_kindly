import React from 'react';
import InputTreats from './InputTreats';
import database from './Firebase';
import { getDownloadURL, ref, child, push, update } from 'firebase/database';

console.log(database);

function updateNewDailyTreats(date, dailyTreats) {
	// A post entry.
	const dailyTreatsData = {
		date: date,
		dailyTreats: dailyTreats,
	};

	// Get a key for a new Post.
	const newDailyTreatsKey = push(child(ref(database), 'dailyTreats')).key;

	// Write the new post's data simultaneously in the posts list.
	const updates = {};
	updates['/nuri/' + newDailyTreatsKey] = postData;

	return update(ref(database), updates);
}
function setDate() {
	let now = new Date();
	let todayYear = now.getFullYear();
	let todayMonth = now.getMonth() + 1;
	let todayDate = now.getDate();
	return todayYear + '.' + todayMonth + '.' + todayDate;
}

function TodaysTreats() {
	// const [treats, setTreats] = useState('');

	// const onChange = e => {
	// 	setTreats(e.target.value);
	// };
	return (
		<div id="container">
			<div>
				<h2>{setDate()}</h2>
				{/* <p> {treats} </p> */}
			</div>
			{/* <input placeholder="간식" onChange={onChange} value={treats} /> */}
			<InputTreats />
			<button id="Btn-submit-treats">Update</button>
		</div>
	);
}

export default TodaysTreats;
