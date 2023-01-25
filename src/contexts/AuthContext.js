import React, { createContext, useContext, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase'

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState({});

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const updateImage = (image) => {
        return updateProfile(auth.currentUser, {
            photoURL: image
        });
    }

    const updateName = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }

    const resetPassword = () => {
        return sendPasswordResetEmail(auth, auth.currentUser.email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <UserContext.Provider value={{
            currentUser,
            signIn,
            logout,
            updateImage,
            updateName,
            resetPassword,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext);
}