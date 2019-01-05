import React from 'react';

import { withFirebase } from '../Firebase';

const SignOut = ({firebase}) => (
    <button type="button" className="btn btn-light" onClick={firebase.doSignOut}>Sign out</button>
)

export default withFirebase(SignOut);