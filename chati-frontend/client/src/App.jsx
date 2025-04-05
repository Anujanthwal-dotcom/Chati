import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Signin from "./components/register/Signin.jsx";
import Signup from "./components/register/Signup.jsx";
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path={`/signin`} element={<Signin/>}/>
          <Route path={`/signup`} element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
