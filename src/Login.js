import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebee';
import { useDispatch } from 'react-redux';
import { login } from './features/counter/userSlice';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();
  const auth = getAuth();

  const register = () => {
    if (!name) {
      alert('Please enter a full name!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(() => {
            dispatch(login({
              email: user.email,
              uid: user.uid,
              displayName: name,
              photoUrl: profilePic,
            }));
          })
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          profileUrl: user.photoURL,
        }));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        src="https://1000logos.net/wp-content/uploads/2023/01/LinkedIn-logo-768x432.png"
        alt=""
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
          type="text"
        />

        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?{' '}
        <span className="login_register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;





