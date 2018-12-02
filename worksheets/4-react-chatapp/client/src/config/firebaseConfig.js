import * as firebase from 'firebase';
import dotenv from 'dotenv'
dotenv.config();
console.log('ssssss')
console.log(process.env);

var config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId
};

firebase
    .initializeApp(config)
    .database()
    .ref();

export default firebase
