// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAaMZxBtvXDtk6bLSeygu3AEttH_nO1vCM',
	authDomain: 'treat-nuri-kindly.firebaseapp.com',
	projectId: 'treat-nuri-kindly',
	storageBucket: 'treat-nuri-kindly.appspot.com',
	messagingSenderId: '655714062533',
	appId: '1:655714062533:web:98f4e249d1e3f1ffad20ac',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default firebaseConfig;
export { database };
