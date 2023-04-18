import React, { useState, useRef, forwardRef } from 'react';
import firebaseConfig, { database } from './Firebase';
import { set, ref, get, child, onValue } from 'firebase/database';
// 클래스로 변경해보고 싶다
function AddDailyTreats() {
	const [treats, setTreats] = useState([{ id: 0, treats: '간식 샘플' }]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(1);

	const onChange = e => setInputText(e.target.value);
	const addTreat = () => {
		const newList = treats.concat({
			id: nextId,
			treats: inputText,
		});
		setNextId(nextId + 1);
		setTreats(newList);
		setInputText('');
		setTreatsData(newList);
	};
	const handleDelete = id => {
		const newList = treats.filter(treats => treats.id !== id);
		setTreats(newList);
	};

	const treatsList = treats.map(treats => (
		<li key={treats.id}>
			{treats.treats}
			<button onClick={() => handleDelete(treats.id)}>delete</button>
		</li>
	));

	const handleOnKeyPress = e => {
		if (e.key === 'Enter') {
			addTreat();
		}
	};

	// const [uploadedData, setUploadeData] = useState({ id, treats });

	const getDate = () => {
		let now = new Date();
		let todayYear = now.getFullYear();
		let todayMonth = now.getMonth() + 1;
		let todayDate = now.getDate();
		return todayYear + '-' + todayMonth + '-' + todayDate;
	};
	const today = getDate();
	// getTreatsData(treatsList);
	const [treatsData, setTreatsData] = useState([]);

	const dbRef = ref(database);
	// Write
	const writeData = () => {
		set(ref(database, '/' + today), {
			treatsData,
		}).then(() => {
			alert('Treats data is uploaded');
		});
		// setTreats([]);
	};

	const [dailyData, setDailyData] = useState([]);
	// const dailyDataList = dailyData.map(dailyData => <li key={dailyData.id}>{dailyData.treats}</li>);
	get(child(dbRef, '/' + today))
		.then(snapshot => {
			if (snapshot.exists()) {
				// console.log(snapshot.val());
			} else {
				console.log('No data available');
			}
		})
		.catch(error => {
			console.error(error);
		});

	onValue(
		dbRef,
		snapshot => {
			snapshot.forEach(childSnapshot => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val();
				if (childKey == getDate()) {
					const todaysData = childData.treatsData;
					console.log(typeof todaysData);
					console.log(todaysData);
				}
			});
		},
		{
			onlyOnce: true,
		}
	);
	return (
		<div className="dailyTreats-data">
			<h2>{getDate()}</h2>
			<ul>{dailyData}</ul>
			<ul>{treatsList}</ul>
			<input value={inputText} onChange={onChange} onKeyPress={handleOnKeyPress} placeholder="Type the treats nuri got" />
			<button onClick={addTreat}>add</button>
			<button className="Btn-submit-treats" onClick={writeData}>
				Write Data
			</button>
		</div>
	);
}

export default AddDailyTreats;
