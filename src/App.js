import './App.css';
import TodaysTreats from './TodaysTreats';
// import InputTreats from './InputTreats';
import firebaseConfig from './Firebase';
console.log(firebaseConfig);
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Treat Nuri Kindly</h1>
			</header>
			<TodaysTreats />
		</div>
	);
}

export default App;
