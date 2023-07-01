import React, { useEffect } from "react";
import "./App.css";
import Header from "./header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/counter/userSlice";
import Login from "./Login";
import { auth } from "./firebee";
//import { unstable_createMuiStrictModeTheme } from "@mui/material";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // User is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });
  }, []);
  
  return (
    <div className="app">
      <Header />
{/* 
      <div className="app">
  <Header /> */}

  {!user ? (<Login />) : (
    /* App Body */
    <div className="app__body">
      {/* Sidebar */}
      <Sidebar />

      {/*  Feed */}
      <Feed />
      {/* Widgets */}
    </div>
  )}
</div>


      
      
  
  );
}

export default App;
