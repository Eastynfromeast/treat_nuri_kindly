import React, { useState, useEffect } from 'react';
import firebaseConfig, { database } from './Firebase';
import { set, ref, onValue } from 'firebase/database';
// 클래스로 변경해보고 싶다
function AddDailyTreats() {
	const [item, setItem] = useState([{ id: '', title: '' }]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(1);

	useEffect(() => {
		connectTodaysDataListDB();
		// async function fetchData() {
		// 	await getTodaysDataList();
		// 	console.log(response);
		// 	//   const response = await fetch('https://example.com/data');
		// 	//   const result = await response.json();
		// 	//   setData(result);
		// }

		// fetchData();
	}, []);

	const onChange = e => setInputText(e.target.value);
	const addTreat = () => {
		const newList = item.concat({
			id: nextId,
			title: inputText,
		});
		setNextId(nextId + 1);
		setItem(newList);
		setInputText('');
		setTreat(newList);
	};
	const handleDelete = id => {
		const newList = item.filter(item => item.id !== id);
		setItem(newList);
	};

	const itmesList = item.map(item => (
		<li key={item.id}>
			{item.title}
			<button onClick={() => handleDelete(item.id)}>delete</button>
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

	const dbRef = ref(database);
	// Write
	const writeData = () => {
		set(ref(database, '/' + today), {
			treat,
		}).then(result => {
			alert('Treats data is uploaded');
			// treat.push(result);
			setItem(treat);
		});
		// setTreats([]);
	};

	// const dailyDataList = dailyData.map(dailyData => <li key={dailyData.id}>{dailyData.treats}</li>);
	// get(child(dbRef, '/' + today))
	// 	.then(snapshot => {
	// 		if (snapshot.exists()) {
	// 			// console.log(snapshot.val());
	// 		} else {
	// 			console.log('No data available');
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.error(error);
	// 	});
	function connectTodaysDataListDB() {
		onValue(
			dbRef,
			snapshot => {
				snapshot.forEach(childSnapshot => {
					const childKey = childSnapshot.key;
					const childData = childSnapshot.val();
					if (childKey == today) {
						const todaysData = childData.treat;
						console.log(todaysData);
						setItem(todaysData);
					}
				});
			},
			{
				onlyOnce: true,
			}
		);
	}

	return (
		<div className="dailyTreats-data">
			<h2>{today}</h2>
			<ul>{itmesList}</ul>
			<input value={inputText} onChange={onChange} onKeyPress={handleOnKeyPress} placeholder="간식" />
			<button onClick={addTreat}>add</button>
			<button className="Btn-submit-treats" onClick={writeData}>
				Write Data
			</button>
			{/* <GetTodaysDataList /> */}
		</div>
	);
}

export default AddDailyTreats;
