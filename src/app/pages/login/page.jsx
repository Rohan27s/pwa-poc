"use client"
import React from "react";
import LoginMedical from "../LoginMedical";
import MedicalAssessor from "../MedicalAssessor/page";
import { useUserData } from "@/app/hooks/useAuth";
const Login = () => {
const userData = useUserData();
console.log(userData);
  return userData?.isAuthenticated ? (
    <MedicalAssessor/>
    ) : (
      <LoginMedical/>
  );
};

export default Login;
