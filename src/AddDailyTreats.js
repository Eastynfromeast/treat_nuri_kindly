import React, { useState, useEffect } from 'react';
import firebaseConfig, { database, db } from './Firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import uuid from 'react-uuid';
import * as DateUtils from './utils/date';

/*
treat = [
	{
		id: string
		title: string
		createdAt: string
	}
]
*/

// 클래스로 변경해보고 싶다
function AddDailyTreats() {
	const [item, setItem] = useState([{ id: '', title: '', createdAt: 'now' }]);
	const [inputText, setInputText] = useState('');

	const today = DateUtils.getTodayDate();
	// const [treat, setTreat] = useState([]);

	const docRef = doc(db, 'nuri123', today);

	useEffect(() => {
		checkAndGetData();
	});
	async function checkAndGetData() {
		const items = await getData();
		if (items != null) {
			setItem(docSnap.data().treat);
		}
	}

	async function getData() {
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data().treat;
		} else {
			return null;
		}
	}
	const onChange = e => setInputText(e.target.value);
	const addTreat = async () => {
		// loading start

		let createdAt = DateUtils.getCreatedAt();

		const newList = item.concat({
			id: uuid(),
			title: inputText,
			createdAt: createdAt,
		});

		try {
			const result = await setDoc(docRef, { newList });
			alert('Treats data is uploaded');
			setItem(newList);
		} catch (error) {
			console.log(error);
			// TODO: error 처리해야함
		}

		// setDoc(docRef, {
		// 	newList,
		// }).then(result => {
		// 	alert('Treats data is uploaded');
		// 	setItem(newList)
		// }).catch(error => {
		// 	console.log(error);
		// 	// TODO: error 처리해야함
		// });
	};
	const handleDelete = createdAt => {
		const newList = item.filter(item => item.createdAt !== createdAt);
		setItem(newList);
	};

	const handleOnKeyPress = e => {
		if (e.key === 'Enter') {
			addTreat();
		}
	};

	function callYesterdayData() {
		const yesterday = new Date().setDate;
	}

	const itmesList = item.map(item => (
		<li key={item.createdAt}>
			{item.title}
			<button onClick={() => handleDelete(item.createdAt)}>delete</button>
		</li>
	));

	return (
		<div className="dailyTreats-data">
			<h2>{today}</h2>
			<ul>{itmesList}</ul>
			<input value={inputText} onChange={onChange} onKeyPress={handleOnKeyPress} placeholder="간식" />
			<button onClick={addTreat}>add</button>
		</div>
	);
}

export default AddDailyTreats;
