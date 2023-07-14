import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import ROUTE_MAP from "../services/routing/routeMap";
import { cacheForms } from "../services/utils";

const MedicalAssessor = () => {
  const navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };

  // Caching Forms on app initilization
  // useEffect(() => {
  //   cacheForms('test_form');
  // }, [])

  return (
    <CommonLayout back="/login" backDisabled>
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
        <Button
          text="Today's Assessments"
          styles="w-80 lg:w-[60%] animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.medical_assessments)}
        />
        <Button
          text="Upcoming"
          styles="w-80 lg:w-[60%] animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.upcoming_medical_assessments)}
        />
      </div>
    </CommonLayout>
  );
};

export default MedicalAssessor;
