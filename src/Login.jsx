import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.init";

const Login = () => {
  const [user, setUser] = useState("");
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .then((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <h2>Login here</h2>
      <button onClick={handleSignIn} className="btn">
        Google Login
      </button>
      <button className="btn" onClick={handleSignOut}>
        SignOut
      </button>
      <Link to="/">Home</Link>

      {user && (
        <div>
          <h3>User Name: {user?.displayName}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
