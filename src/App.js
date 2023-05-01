import './App.css';
import AddDailyTreats from './AddDailyTreats';
// import InputTreats from './InputTreats';
import FireStoreTester from './FireStore';
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Treat Nuri Kindly</h1>
			</header>
			<AddDailyTreats />
			<FireStoreTester />
		</div>
	);
}

export default App;
