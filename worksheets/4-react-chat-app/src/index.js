import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import Firebase and the FirebaseContext used to access the Firebase instance.
import Firebase, { FirebaseContext } from './components/Firebase';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FirebaseContext.Provider value={new Firebase()}><App /></FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
