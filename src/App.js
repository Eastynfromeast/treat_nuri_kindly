import './App.css';
import AddTodaysTreats from './TodaysTreats';
// import InputTreats from './InputTreats';
import firebaseConfig, { database } from './Firebase';
import { useState } from 'react';
import { ref, set } from 'firebase/database';

function App() {
	const [treatsData, setTreatsData] = useState('');

	const handleTreatsChange = e => {
		setTreatsData(e.target.value);
	};

	// Write
	const writeData = () => {
		set(ref(database, 'test/'), {
			treatsData,
		});
		setTreatsData('');
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>Treat Nuri Kindly</h1>
			</header>
			<AddTodaysTreats />
			<input type="text" value={treatsData} onChange={handleTreatsChange}></input>
			<button onClick={writeData}>write data</button>
		</div>
	);
}

export default App;
