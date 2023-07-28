"use client"
import React, { useState, useEffect, useContext, useRef } from "react";
import CommonLayout from "../../../components/CommonLayout";
import { useParams } from "react-router-dom";
import { getMedicalAssessments, getPrefillXML, saveFormSubmission } from "../../../services/api";
import { StateContext } from "@/app/page";
import { getCookie, getFormData, getFromLocalForage, getOfflineCapableForm, handleFormEvents, isImage, makeDataForPrefill, setCookie, setToLocalForage, updateFormData } from "../../../services/utils";
import ROUTE_MAP from "../../../services/routing/routeMap";
import { useUserData } from "@/app/hooks/useAuth";
import { useRouter } from 'next/navigation'
import formSubmissionMachine from "@/app/xstate/formSubmissionMachine";
import { useMachine } from '@xstate/react';
import SuccessPopup from "@/app/components/popup";
import { useDispatch } from "react-redux";
import { coordinates } from "@/app/redux/store";
const ENKETO_MANAGER_URL = process.env.NEXT_PUBLIC_ENKETO_MANAGER_UR;
const ENKETO_URL = process.env.NEXT_PUBLIC_HASURA_URL;

const GenericOdkForm = ({ params }) => {
//   const router1 = useRouter()
//   const x = router1.query;
const formName=params.slug.replace(/%/g, ' ');
console.log(formName);
//   console.log();
  const [current, send] = useMachine(formSubmissionMachine);
  console.log(current);
  const user = useUserData();
  // const router = useRouter()
  const dispatch = useDispatch();
  const [surveyUrl, setSurveyUrl] = useState("");
  // let { formName } = useParams();
  const scheduleId = useRef();
  const [formSubmitted] = useState(false);
  const formSpec = {
    forms: {
      [formName]: {
        skipOnSuccessMessage: true,
        prefill: {},
        submissionURL: "",
        name: formName,
        successCheck: "async (formData) => { return true; }",
        onSuccess: {
          notificationMessage: "Form submitted successfully",
          sideEffect: "async (formData) => { console.log(formData); }",
        },
        onFailure: {
          message: "Form submission failed",
          sideEffect: "async (formData) => { console.log(formData); }",
          next: {
            type: "url",
            id: "google",
          },
        },
      },
    },
    start: formName,
    metaData: {},
  };

  // const { state } = useContext(StateContext);

  const getFormURI = (form, ofsd, prefillSpec) => {
    return encodeURIComponent(
      `${ENKETO_MANAGER_URL}/prefillXML?form=${form}&onFormSuccessData=${encodeFunction(
        ofsd
      )}&prefillSpec=${encodeFunction(prefillSpec)}`
    );
  };

  const encodeFunction = (func) => encodeURIComponent(JSON.stringify(func));
  const startingForm = formSpec.start;
  const [formId, setFormId] = useState(startingForm);
  const [encodedFormSpec, setEncodedFormSpec] = useState(
    encodeURI(JSON.stringify(formSpec.forms[formId]))
  );
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [encodedFormURI, setEncodedFormURI] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // const [encodedFormURI, setEncodedFormURI] = useState(
  //   getFormURI(
  //     formId,
  //     formSpec.forms[formId].onSuccess,
  //     formSpec.forms[formId].prefill
  //   )
  // );
  const [prefilledFormData, setPrefilledFormData] = useState();

  const loading = useRef(false);
  const [assData, setData] = useState({
    district: "",
    instituteName: "",
    nursing: "",
    paramedical: "",
    type: "",
    latitude: null,
    longitude: null,
  });
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    send('CLOSE_SUCCESS_POPUP');
  };
  async function afterFormSubmit(e) {
    console.log("Form Submit Event ----->", e.data);
    send('FORM_SUBMISSION_SUCCESS');
    dispatch(coordinates());
    setShowSuccessPopup(true);

    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
    if (JSON.parse(e?.data)?.state === "ON_FORM_SUCCESS_COMPLETED") {
      console.log("Its a success");
      send('FORM_SUBMISSION_SUCCESS');
      dispatch(coordinates());
      // Show the success popup
      setShowSuccessPopup(true);
    }
    try {
      const { nextForm, formData, onSuccessData, onFailureData } = data;
      if (data?.state === "ON_FORM_SUCCESS_COMPLETED") {
        const updatedFormData = await updateFormData(formSpec.start);

        saveFormSubmission({
          schedule_id: scheduleId.current,
          form_data: updatedFormData,
          assessment_type: formName.startsWith('hospital') ? 'hospital' : 'institute',
          form_name: formSpec.start,
        });
        send('FORM_SUBMISSION_SUCCESS');
        console.log("Hogya submit");
        setTimeout(() => router.push(ROUTE_MAP.assessment_type), 2000);
        // setCookie(startingForm + `${new Date().toISOString().split("T")[0]}`, '');
        // setCookie(startingForm + `Images${new Date().toISOString().split("T")[0]}`, '');
      }

      if (nextForm?.type === "form") {
        setFormId(nextForm.id);
        setOnFormSuccessData(onSuccessData);
        setOnFormFailureData(onFailureData);
        setEncodedFormSpec(encodeURI(JSON.stringify(formSpec.forms[formId])));
        setEncodedFormURI(
          getFormURI(
            nextForm.id,
            onSuccessData,
            formSpec.forms[nextForm.id].prefill
          )
        );
        router.push(ROUTE_MAP.assessment_type)
      } else if (nextForm?.type === 'url') {
        window.location.href = nextForm.url;
      }
    } catch (e) {
      console.log(e);
      send('FORM_SUBMISSION_FAILURE');

    }
  }

  const handleEventTrigger = async (e) => {
    handleFormEvents(startingForm, afterFormSubmit, e, user)

  }

  const bindEventListener = () => {
    window.addEventListener("message", handleEventTrigger);
  };
  const detachEventBinding = () => {
    window.removeEventListener("message", handleEventTrigger);
  };

  useEffect(() => {
    bindEventListener();
    getFormData({ loading, scheduleId, formSpec, startingForm, formId, setData, setEncodedFormSpec, setEncodedFormURI });
    getSurveyUrl();
    return () => {
      detachEventBinding();
      setData(null);
      setPrefilledFormData(null);
    };
  }, []);

  const getSurveyUrl = async () => {
    let surveyUrl = await getOfflineCapableForm(formName);
    // let surveyUrl = await getOfflineCapableForm('widgets');
    console.log("SurveyURL:", surveyUrl);
    if (!surveyUrl)
      setSurveyUrl("https://8065-rohan27s-workflow-6cybi0h2yfx.ws-us102.gitpod.io/x/wnoqac4d")
    else
      setSurveyUrl(surveyUrl);
  }


  // TODO
  const clearFormCache = async () => {
    let formUri = await getFromLocalForage('formUri');
    const formId = formUri.slice(formUri.lastIndexOf('/') + 1);
    const enketoDB = indexedDB.open('enketo', 3);
    indexedDB.databases().then(r => console.log(r))
    console.log(enketoDB)
  }



  return (
    <CommonLayout back={ROUTE_MAP.assessment_type}>
      <div className="flex flex-col items-center">
        {/* {encodedFormURI && assData && (
          <>
            <iframe
              title="form"
              src={`${ENKETO_URL}/preview?formSpec=${encodedFormSpec}&xform=${encodedFormURI}&userId=${user.user.id}`}
              style={{ height: "80vh", width: "100%", marginTop: "20px" }}
            />
          </>
        )} */}
        {surveyUrl && (
          <>
            <iframe
              title="form"
              src={surveyUrl}
              style={{ height: "80vh", width: "100%", marginTop: "20px" }}
            />
          </>
        )}
        {/* {current.matches("success") && <h1>SUCCESS</h1>} */}
        {current.matches("success") &&
          <SuccessPopup onClose={handleCloseSuccessPopup} />
        }
        {/* <div className="mt-5 p-4 border border-orange-300" onClick={clearFormCache}> Clear saved data</div> */}
      </div>
    </CommonLayout>
  );
};

export default GenericOdkForm;
