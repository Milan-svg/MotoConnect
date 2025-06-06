import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const listenToAuthChanges = (callback) => {
  // well pass a function as a callback, whenever a change in auth state happens,this func will run followed by the callback thats passedd.
  return onAuthStateChanged(auth, callback);
};

// since redux is just stored in memory, it gets cleared when page reloads. so well use onauthchanged to check with firebas if the user is still loggedin, firebase stores all that in the cookies. the function checks user status, in out component, we'll use it on startup, (pass on the user onject) so that redux stays updated on every reload.
