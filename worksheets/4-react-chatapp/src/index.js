import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import dotenv from "dotenv"

dotenv.config();

const config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();