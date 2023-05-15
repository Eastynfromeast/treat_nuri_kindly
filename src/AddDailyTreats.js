import React, { useState, useEffect } from 'react';
import firebaseConfig, { database, db } from './Firebase';
import { set, ref, onValue } from 'firebase/database';
import { doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import uuid from 'react-uuid';

// 클래스로 변경해보고 싶다
function AddDailyTreats() {
	const [item, setItem] = useState([{ id: '', title: '', createdAt: 'now' }]);
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		checkAndGetData();
	});
	async function checkAndGetData() {
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setItem(docSnap.data().treat);
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!');
		}
	}
	const onChange = e => setInputText(e.target.value);
	const addTreat = () => {
		let createdDate = new Date();
		let createdAt = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(createdDate);
		const newList = item.concat({
			id: uuid(),
			title: inputText,
			createdAt: createdAt,
		});

		setItem(newList);
		setInputText('');
		setTreat(newList);
	};
	const handleDelete = createdAt => {
		const newList = item.filter(item => item.createdAt !== createdAt);
		setItem(newList);
	};

	const itmesList = item.map(item => (
		<li key={item.createdAt}>
			{item.title}
			<button onClick={() => handleDelete(item.createdAt)}>delete</button>
		</li>
	));

	const handleOnKeyPress = e => {
		if (e.key === 'Enter') {
			addTreat();
		}
	};
	function leftPad(value) {
		if (value >= 10) {
			return value;
		}

		return `0${value}`;
	}
	const getTodayDate = () => {
		let now = new Date();
		let todayYear = now.getFullYear();
		let todayMonth = leftPad(now.getMonth() + 1);
		let todayDate = leftPad(now.getDate());
		return todayYear + '-' + todayMonth + '-' + todayDate;
		// let nowForTitle = new Intl.DateTimeFormat('ko-KR', {
		// 	year: 'numeric',
		// 	month: '2-digit',
		// 	day: '2-digit',
		// }).format(now);
		// return nowForTitle;
	};

	const today = getTodayDate();
	const [treat, setTreat] = useState([]);

	const docRef = doc(db, 'nuri123', today);

	// FireStore Update
	const updateDB = () => {
		setDoc(docRef, {
			treat,
		}).then(result => {
			alert('Treats data is uploaded');
			// setItem(treat)
			connectTodaysDataListDB();
		});
	};

	function connectTodaysDataListDB() {
		// onValue(
		// 	dbRef,
		// 	snapshot => {
		// 		snapshot.forEach(childSnapshot => {
		// 			const childKey = childSnapshot.key;
		// 			const childData = childSnapshot.val();
		// 			if (childKey == today) {
		// 				const todaysData = childData.treat;
		// 				console.log(todaysData);
		// 				setItem(todaysData);
		// 			}
		// 		});
		// 	},
		// 	{
		// 		onlyOnce: true,
		// 	}
		// );
		const unsub = onSnapshot(docRef, doc => {
			setItem(doc.data().treat);
		});
	}

	function callYesterdayData() {
		const yesterday = new Date().setDate;
	}

	return (
		<div className="dailyTreats-data">
			<h2>{today}</h2>
			<ul>{itmesList}</ul>
			<input value={inputText} onChange={onChange} onKeyPress={handleOnKeyPress} placeholder="간식" />
			<button onClick={addTreat}>add</button>
			<button className="Btn-submit-treats" onClick={updateDB}>
				update
			</button>
		</div>
	);
}

export default AddDailyTreats;
