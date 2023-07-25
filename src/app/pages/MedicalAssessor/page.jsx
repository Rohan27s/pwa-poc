"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Button from "../../components/Button";
import CommonLayout from "../../components/CommonLayout";
import ROUTE_MAP from "../../services/routing/routeMap";
import Linker from "@/app/components/Link";
// import { cacheForms } from "../../services/utils";

const MedicalAssessor = () => {
  const router = useRouter();
  const handleClick = (route) => {
    router.push(route);
  };

  // Caching Forms on app initilization
  // useEffect(() => {
  //   cacheForms('test_form');
  // }, [])

  return (
    <CommonLayout back="/" backDisabled>
      <div className="flex flex-col px-5 py-8 items-center">
        <img
          src="/assets/medicalAssessorWelcome.png"
          className="h-[200px] mt-4 lg:h-[300px]"
          alt="illustration"
        />
        <p className="text-secondary text-[34px] font-bold mt-8 lg:text-[45px] animate__animated animate__fadeInDown">
          Welcome Assessor
        </p>
        <p className="text-primary text-md mb-2 animate__animated animate__fadeInDown">
          Please check your assessments
        </p>
        <Linker
          text="Get Started"
          styles="w-80 lg:w-[60%] animate__animated animate__fadeInDown"
          link={ROUTE_MAP.capture_location}
        />
       

      </div>
    </CommonLayout>
  );
};

export default MedicalAssessor;
