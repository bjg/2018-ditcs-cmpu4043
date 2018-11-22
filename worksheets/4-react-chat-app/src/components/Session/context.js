// We want to be able to access the auth user in all components so we can do that
// by 
import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;