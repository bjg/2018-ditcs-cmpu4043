import * as firebase from 'firebase';

var config = 
{
    apiKey: "AIzaSyB9lbNlv-BNwgF85Fzj7UokH7OiNqQD9r8",
    authDomain: "chatapp-firebase-e0d24.firebaseapp.com",
    databaseURL: "https://chatapp-firebase-e0d24.firebaseio.com",
    projectId: "chatapp-firebase-e0d24",
    storageBucket: "chatapp-firebase-e0d24.appspot.com",
    messagingSenderId: "941031286708"
  };

const fireBase = firebase.initializeApp(config);

export default fireBase;