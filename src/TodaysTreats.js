import React from 'react';
import InputTreats from './InputTreats';
import { getDownloadURL, ref, child, push, update } from 'firebase/database';

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

function AddTodaysTreats() {
	const setDate = () => {
		let now = new Date();
		let todayYear = now.getFullYear();
		let todayMonth = now.getMonth() + 1;
		let todayDate = now.getDate();
		return todayYear + '-' + todayMonth + '-' + todayDate;
	};

	return (
		<div className="dailyTreats-data">
			<h2>{setDate()}</h2>
			<InputTreats />
			<button className="Btn-submit-treats"> Update</button>
		</div>
	);
}

export default AddTodaysTreats;
