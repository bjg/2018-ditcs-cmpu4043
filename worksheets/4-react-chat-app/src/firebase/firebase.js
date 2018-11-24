import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        // Enable Firebase auth
        this.auth = app.auth();

        // Get the db
        this.db = app.database();
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
    
    // Create a user
    user = uid => this.db.ref(`users/${uid}`);

    // Return the users
    users = () => this.db.ref('users');
}


export default Firebase;