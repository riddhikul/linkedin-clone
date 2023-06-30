import React from "react";
import "./App.css";
import Header from "./header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counter/userSlice";
import Login from "./Login";

function App() {
  const user = useSelector(selectUser)
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
