import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCYEvZ4iJIsVa5dgZxO4t_qwcRb2WKO7DY',
	authDomain: 'stryktipset-5bf3a.firebaseapp.com',
	projectId: 'stryktipset-5bf3a',
	storageBucket: 'stryktipset-5bf3a.appspot.com',
	messagingSenderId: '196082316325',
	appId: '1:196082316325:web:f600c38e509a7ba2b47bcc',
	measurementId: 'G-J98HJFB1M3'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
