import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyDGctU-d7Kbp10qjICbVsuNMQaZ82q3Nh0",
	authDomain: "kabom-3627c.firebaseapp.com",
	databaseURL: "https://kabom-3627c.firebaseio.com",
	storageBucket: "kabom-3627c.appspot.com"
};

if (!firebase.length) {
	firebase.initializeApp(config)
}

export const database = firebase.database().ref()
export const auth = firebase.auth