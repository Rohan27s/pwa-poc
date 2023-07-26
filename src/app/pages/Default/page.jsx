"use client"
import React from "react";
import MedicalAssessor from "../MedicalAssessor/page";
import { useUserData } from "@/app/hooks/useAuth";
import { useMachine } from '@xstate/react';
import authMachine from "@/app/xstate/stateMachine";
import Home from "../Home/page";
const Login = () => {
  const userData = useUserData();
  const [current, send] = useMachine(authMachine);

  const isAuthenticated = userData?.isAuthenticated;
  if (isAuthenticated) {
    send("AUTHENTICATED");
  } else {
    send("UNAUTHENTICATED");
  }
  return current.matches("authenticated") ? (
    <MedicalAssessor />
  ) : (
    <Home />
  );
};

export default Login;
