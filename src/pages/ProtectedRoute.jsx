import React, { useContext } from 'react';
import UserContext, {saveUserLocally, removeUserLocally} from '../store/UserContext';
import authenticate from '../hooks/authenticate';
import { Redirect } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const [user, userDispatch] = useContext(UserContext);

    const callback = function (authenticatedUser) {
        return userDispatch(saveUserLocally(authenticatedUser))
      }
    
      const removeUser = function (authenticatedUser) {
        return userDispatch(removeUserLocally())
      }
      authenticate(user, callback, removeUser)

    if (!user) {
        // Redirect to login page if not logged in
        return <Redirect to="/account" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute