import { auth, database } from './constants';
import Login from '../pages/login/login'

// Wrapper functions for Firebase Authentication features.
// * No longer using these functions because of synchronization issues
// * Will incorporate directly. Just here for reference.

// // Creates a new user
// export function createAccount(email, password) {
// 	auth().createUserWithEmailAndPassword(email, password).then(function() {
// 		sendEmailVerification();
// 	}).catch(function(error) {
// 		// Handle Errors here.
// 		// TODO: Format
// 		return error.message;
// 	});
// }

// // Helper function for email verification when creating account
// function sendEmailVerification(){
// 	var user = auth().currentUser;
// 	user.sendEmailVerification().then(function() {
// 		return "success";
// 	}).catch(function(error) {
// 		// An error happened. Should never occur.
// 		// TODO: Format
// 		return error.message;
// 	});
// }

// Sign in the user with the email/password
// export function signIn(email, password) {
// 	auth().signInWithEmailAndPassword(email, password).then(function() {
// 		var user = auth().currentUser;
// 		if (user.emailVerified) {
// 			return "success"
// 		} else {
// 			return "Please verify your email before signing in."
// 		}
// 	}).catch(function(error) {
// 		// TODO: Format
// 		return error.message;
// 	});
// }

export function getCurrentUser () {
	return auth().currentUser;
}

// Checks if user is logged in
export function userIsLoggedIn() {
	auth().onAuthStateChanged(function(user) {
		if (user) {
			return true;
		} else {
			return false;
		}
	});
}

// If a user has verified their email upon sign up
export function userIsVerified () {
	var user = auth().currentUser;
	if (user) {
		return user.emailVerified;
	} else {
		return false;
	}
}

// // Send a reset password email to the user's email
// export function resetPassword(email) {
// 	auth().sendPasswordResetEmail(email).then(function() {

// 		return "success";
// 	}).catch(function(error) {
// 		// TODO: Format
// 		return error.message;
// 	});
// }

// Update current user's password
export function updatePassword(password) {
	var user = auth().currentUser;
	user.updatePassword(password).then(function() {
		return "success";
	}).catch(function(error) {
		// TODO: Format
		return error.message;
	});
}

// Update current user's email
export function updateEmail(email) {
	var user = auth().currentUser;
	user.updateEmail(email).then(function() {
	// Update successful.
		return "success";
	}).catch(function(error) {
	// An error happened.
		// TODO: Format
		return error.message;
	});
}

// Signs user out of firebase
export function signOut() {
	auth().signOut().then(function() {
		return "success";
	}).catch(function(error) {
		// TODO: Format
		return error.message;
	});
}

// Deletes user from database
export function deleteUser() {
	var user = auth().currentUser;
	user.delete().then(function() {
		return "success";
	}).catch(function(error) {
		// TODO: Format
		return error.messsage;
	});
}