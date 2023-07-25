"use client"
import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Button from "../../components/Button";
import CommonLayout from "../../components/CommonLayout";
import ROUTE_MAP from "../../services/routing/routeMap";
import { getFromLocalForage, setToLocalForage } from "../../services/utils";
import toast from 'react-hot-toast';
import { getDataFromHasura, saveDataToHasura } from "../../services/api";
import { useUserData } from '@/app/hooks/useAuth';
import Linker from '@/app/components/Link';
const page = () => {
    const router = useRouter()
  const [textData, setTextData] = useState();
  const [dateData, setDateData] = useState();

  const userData = useUserData();
  const getInitialData = async () => {
    if (navigator.onLine) {
      let appData = await getDataFromHasura(userData);
      if (appData?.data?.dummy_poc_table?.length) {
        setTextData(appData?.data?.dummy_poc_table?.[0].text_input)
        setDateData(appData?.data?.dummy_poc_table?.[0].date_input)
      }
    } else {
      let appData = await getFromLocalForage('appData',true,userData);
      setTextData(appData?.textData)
      setDateData(appData?.dateData);
    }
  }

  const handleInput = async (setter, val, type) => {
    setter(val);
    let appData = await getFromLocalForage('appData',true,userData) || {};
    appData[type] = val;
    setToLocalForage('appData', appData);
  }

  const saveDataOnline = async () => {
    if (!navigator.onLine) {
      setToLocalForage('syncData', true);
      toast('Your data has been saved and will be synced with server once internet is available ✅')
    } else
      saveDataToHasura({
        text_input: textData,
        date_input: dateData
      })
  }

  useEffect(() => {
    getInitialData();
  }, [])
  return (
    <CommonLayout back={ROUTE_MAP.capture_location}>
      <div className="flex flex-col px-5 py-8 items-center">
        <p className="text-secondary text-[28px] font-bold mt-4 lg:text-[45px] animate__animated animate__fadeIn">
          Select Form
        </p>
        {/* <Button text="Test Form" styles="lg:w-[70%] animate__animated animate__fadeInDown" onClick={() => { navigator.onLine ? navigate(ROUTE_MAP.otherforms_param_formName + "hospital_clinical_facilities") : navigate(ROUTE_MAP.offline_odk_form + "hospital_clinical_facilities") }} /> */}
        <Linker text="Test Form" styles="lg:w-[70%] animate__animated animate__fadeInDown" link={ROUTE_MAP.generic_form_test} />
        <div className="flex flex-col py-3 w-full mt-10">
          <span className="text-secondary pb-2 font-medium">
            Dummy Text Input
          </span>
          <input
            type="text"
            className="border-2 border-primary p-3.5"
            onChange={(e) => handleInput(setTextData, e.target.value, 'textData')}
            value={textData}
          />
        </div>
        <div className="flex flex-col py-3 w-full ">
          <span className="text-secondary pb-2 font-medium">
            Dummy Date Input
          </span>
          <input
            type="date"
            className="border-2 border-primary p-3.5"
            onChange={(e) => handleInput(setDateData, e.target.value, 'dateData')}
            value={dateData}
          />
        </div>
        <div style={{ fontSize: 18, fontWeight: 'bolder', cursor: 'pointer' }} onClick={saveDataOnline}>Save Online</div>
      </div>
    </CommonLayout>
  )
}

export default page