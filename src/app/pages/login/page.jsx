"use client"
import React, { useState } from "react";
import LoginMedical from "../LoginMedical";
import Home from "../Home/page";
import MedicalAssessor from "../MedicalAssessor/page";
import { useSelector } from "react-redux";
const Login = () => {
  // const [loginShow, setLoginShow] = useState(tr);
  const auth1= useSelector((state)=>state.auth);
console.log(auth1);
  // const handleSetLoginShow = () => setLoginShow((oldValue) => !oldValue);
  return auth1.isAuthenticated ? (
    <MedicalAssessor/>
    ) : (
      <LoginMedical handleStepChangeForLogin={auth1} />
  );
};

export default Login;
