import './App.css';
import AddDailyTreats from './AddDailyTreats';
// import InputTreats from './InputTreats';
import { getComments } from './FireStore';
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Treat Nuri Kindly</h1>
			</header>
			<AddDailyTreats />
			<div>{getComments}</div>
		</div>
	);
}

export default App;
