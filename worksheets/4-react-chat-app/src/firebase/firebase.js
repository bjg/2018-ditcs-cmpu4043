import app from 'firebase/app'
import 'firebase/auth';

const prodConfig = {
    apiKey: 'AIzaSyBjT19b2eIHf3ZupAM5U8vb2is4ljS3pCw',
    authDomain: 'react-chat-app-3d7d5.firebaseapp.com',
    databaseURL: 'https://react-chat-app-3d7d5.firebaseio.com',
    projectId: 'react-chat-app-3d7d5',
    storageBucket: 'react-chat-app-3d7d5.appspot.com',
    messagingSenderId: '41737086563'
};

const devConfig = {
    apiKey: 'AIzaSyBjT19b2eIHf3ZupAM5U8vb2is4ljS3pCw',
    authDomain: 'react-chat-app-3d7d5.firebaseapp.com',
    databaseURL: 'https://react-chat-app-3d7d5.firebaseio.com',
    projectId: 'react-chat-app-3d7d5',
    storageBucket: 'react-chat-app-3d7d5.appspot.com',
    messagingSenderId: '41737086563'
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

class Firebase {
    constructor() {
        app.initializeApp(config);

        // Enable Firebase auth
        this.auth = app.auth();
    }
    
    // Sign up
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // Sign in
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Sign out
    doSignOut = () =>
        this.auth.signOut();
}


export default Firebase;