import React, { useContext, useEffect } from 'react';
import UserContext, {saveUserLocally, removeUserLocally} from '../store/UserContext';
import authenticate from '../hooks/authenticate';
import AccountWrapper from './AccountWrapper';
import NativeWrapper from './NativeWrapper';
import { Redirect } from 'react-router';
import { useNotifier } from '../store/notificationContext';

const ProtectedRoute = ({ title, children }) => {
    const [user, userDispatch] = useContext(UserContext);

    const callback = function (authenticatedUser) {
        return userDispatch(saveUserLocally(authenticatedUser))
      }
    
      const removeUser = function (authenticatedUser) {
        return userDispatch(removeUserLocally())
      }
      authenticate(user, callback, removeUser)

      const notifyWith = useNotifier()

      useEffect(() => {
        if (!user) {
          notifyWith(`login to view ${title}`)
        }
      }, [])
    


   
    if (!user) {
        // Redirect to login page if not logged in
        return <AccountWrapper/>
    }

    return <>{children}</>;
};

export default ProtectedRoute