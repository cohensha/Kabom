import { auth, database } from './constants';

// Firebase Database Wrapper Class

/* How to WRITE to Firebase's database:
 * 
 * 1) Single Write:
	import { database } from "path/to/firebase/constants";

	database.child("String/of/path").set(value);
	// Note: last node in the path string = key

 * 2) Multiple Write:
 	import { database } from "path/to/firebase/constants";

	database.child("String/of/path").set({
		"StringKey" : "String",
		"IntegerKey" : 2,
		"BooleanKey" : true
	});
	// Note: last node is not the key anymore.
 *
 * How to READ from Firebase's database:
 *
 * 1) Single Read of One Value:
	import { database } from "path/to/firebase/constants";

	var reference = database.child("path/to/branch");
	// Note: last node in the path string = key

	reference.once("value").then(function(snapshot){
		// You are now in the Promise land (haha get it).
		// Every line the the then() will be executed after the snapshot has been retrieved.

		if (snapshot.exists()) { // Just to check if the data exists

		 	//do something with the value:
		 	snapshot.val();

		} else {
			return null;
		}
	});
 *
 * 2) Multiple Read
	import { database } from "path/to/firebase/constants";

	var reference = database.child("path/to/branch");
	// Note: last node in the path string = key

	reference.once("value").then(function(snapshot){
		// You are now in the Promise land (haha get it).
		// Every line the the then() will be executed after the snapshot has been retrieved.
		
		if (snapshot.exists()) {
			// Create a data structure to store your data
			var array = [];

			// Use the forEach function to get each childSnapshot
			// Operate on the child snapshot as you would a regular snapshot
			
			snapshot.forEach(function(childSnapshot) {
				var item = childSnapshot.val();
				array.push(item);
			});
			return array;
		} else {
			return null;
		}

	}
	
 */

// Some Helper functions I wrote that probrobably won't be used because of
// the whole synchronization issue.

// Adds a new user to database upon creating an account
export function writeNewUser(firstName, lastName, email) {
	var user = auth.currentUser;
	database.child('users/' + user.uid).set({
		'firstName': firstName,
		'lastName': lastName,
		'email' : email
	});
}

export function writeValue (path, value) {
	database.child(path).set(value);
}

export function getValue (path) {
	var ref = database.child(path);
	ref.once("value").then(function(snapshot){
		return snapshotToValue(snapshot);
	});
}

export function getArray(path) {
	var ref = database.child(path);
	ref.once("value").then(function(snapshot){
		return snapshotToArray(snapshot);
	});
}

export function snapshotToValue (snapshot) {
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		return null;
	}
}

export function snapshotToArray (snapshot) {
	if (snapshot.exists()) {
		var array = [];
		snapshot.forEach(function(childSnapshot) {
			var item = childSnapshot.val();
			array.push(item);
		});
		return array;
	} else {
		return null;
	}
}