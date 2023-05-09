import React, { useState, useEffect } from 'react';
import firebaseConfig, { database, db } from './Firebase';
import { set, ref, onValue } from 'firebase/database';
import { doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import uuid from 'react-uuid';

// 클래스로 변경해보고 싶다
function AddDailyTreats() {
	const [item, setItem] = useState([{ id: '', title: '', createdAt: 'now' }]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(1);

	useEffect(() => {
		connectTodaysDataListDB();
	}, []);

	const onChange = e => setInputText(e.target.value);
	const addTreat = () => {
		let date = new Date();
		let createdAt = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(date);
		const newList = item.concat({
			id: uuid(),
			title: inputText,
			createdAt: createdAt,
		});
		// setNextId(nextId + 1);
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

	// const [uploadedData, setUploadeData] = useState({ id, treats });

	const getTodayDate = () => {
		let now = new Date();
		let todayYear = now.getFullYear();
		let todayMonth = now.getMonth() + 1;
		let todayDate = now.getDate();
		return todayYear + '-' + todayMonth + '-' + todayDate;
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
			setItem(treat);
		});
	};

	async function connectTodaysDataListDB() {
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
		// const docSnap = await getDoc(docRef);
		// if (docSnap.exists()) {
		// 	console.log('Document data:', docSnap.data());
		// } else {
		// 	// docSnap.data() will be undefined in this case
		// 	console.log('No such document!');
		// }
		const unsub = onSnapshot(docRef, doc => {
			setItem(doc.data().treat);
		});
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
			{/* <GetTodaysDataList /> */}
		</div>
	);
}

export default AddDailyTreats;
