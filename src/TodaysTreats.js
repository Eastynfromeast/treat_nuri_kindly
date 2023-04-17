import React, { useState, useRef } from 'react';
import { getDownloadURL, child, push, update } from 'firebase/database';

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
	// const getTreatsData = x => {
	// 	console.log(x);
	// };
	return (
		<div>
			{/* <input type="text" value={treatsData} onChange={handleTreatsChange}></input> */}
			{/* <button onClick={writeData}>write data</button> */}
		</div>
	);
}

export default AddTodaysTreats;
