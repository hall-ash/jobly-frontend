// stores the current state of the user object
// and a method to change the user state in the 
// application's context

import { createContext } from 'react';

const AuthContext = createContext();

export default AuthContext;