import React from "react";
import { Routes, useNavigate, useParams } from "react-router-dom";
import CommonLayout from "../components/CommonLayout";
import OfflineForm from "./forms/OfflineForm";

const OfflineOdkForm = () => {
  let { formName } = useParams();

  const navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };
  return (
    <CommonLayout backDisabled={true} logoutDisabled>
      <OfflineForm formName={formName} />
    </CommonLayout>
  );
};

export default OfflineOdkForm;
