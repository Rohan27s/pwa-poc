import React from "react";
import { useRouter } from 'next/navigation';

import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import ROUTE_MAP from "../services/routing/routeMap";

const Home = ({ handleStepChangeForLogin }) => {
  const router = useRouter()

  const handleClick = (route) => {
    router.push(route);
    handleStepChangeForLogin();
  };
  return (
    <CommonLayout backDisabled={true} logoutDisabled>
      <div className="flex flex-col px-5 py-8 items-center ">
        <img
          src="/assets/homeVector.png "
          className="h-60 lg:h-80 my-5 lg:mt-[70px]"
          alt="illustration"
        />
        <Button
          text="Login"
          styles="w-80 lg:w-[70%] lg:mt-[70px] animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.login)}
        />
        {/* <Button
          text="Register"
          styles="w-80 lg:w-[70%] lg:mt-[30px] animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.register)}
        /> */}
      </div>
    </CommonLayout>
  );
};

export default Home;
