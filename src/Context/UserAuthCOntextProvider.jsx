import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./Firebase";

const UserAuthContext = createContext();

export function UserAuthCOntextProvider({ children }) {
  const [user, setUser] = useState("");

  const SignUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const Login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const Logout = () => signOut();
  const GsignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider value={{ GsignIn, user, Login, SignUp }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
