/***
 * Name: firebase.js
 *
 * Description: - Firebase API detials.
 **/

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Initialize Firebase
var config = {
    apiKey: "Hidden",
    authDomain: "Hidden",
    databaseURL: "Hidden",
    projectId: "Hidden",
    storageBucket: "Hidden",
    messagingSenderId: "Hidden"
  };

  firebase.initializeApp(config);

  export default firebase;