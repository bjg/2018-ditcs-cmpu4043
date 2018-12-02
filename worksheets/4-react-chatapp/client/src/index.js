import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import 'semantic-ui-css/semantic.min.css';
import { saveUserID } from './actions/uidAction'
import './style.css'
import firebase from './config/firebaseConfig'

const store = createStore(rootReducer);

firebase.auth().signInAnonymously().then(function(data) {
    console.log(data.user.uid);
}, function(error) {
    console.error('Sign Out Error', error);
});

const username = localStorage.chatroom_username

if (username){
    store.dispatch(saveUserID(username))
}else {
    store.dispatch(saveUserID(null))
}

ReactDOM.render(
    <BrowserRouter>
    {/*<App />*/}

        <Provider store={store}>
            <Route component={App} />
        </Provider>


    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
