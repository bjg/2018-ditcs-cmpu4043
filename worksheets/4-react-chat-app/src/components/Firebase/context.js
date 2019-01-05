// This is used to instaniate Firebase once rather than
// a per class basis
import React from 'react';

const FirebaseContext = React.createContext(null);

// Create withFirebase, which will basically wrap any component with Firebase
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase}/>}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;