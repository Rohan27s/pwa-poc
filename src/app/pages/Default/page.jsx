"use client"
import React from "react";
import LoginMedical from "../login/page";
import MedicalAssessor from "../MedicalAssessor/page";
import { useUserData } from "@/app/hooks/useAuth";
import Home from "../Home/page";
const Login = () => {
const userData = useUserData();
console.log(userData);
  return userData?.isAuthenticated ? (
    <MedicalAssessor/>
    ) : (
      <Home/>
  );
};

export default Login;
