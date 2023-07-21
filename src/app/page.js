"use client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { createContext, useEffect, useRef, useState } from "react";
import MedicalAssessor from "./pages/MedicalAssessor";
import MedicalAssessments from "./pages/MedicalAssessments";
import UpcomingMedicalAssessments from "./pages/UpcomingMedicalAssessments";
import CaptureLocation from "./pages/CaptureLocation/page";
import ForgotPassword from "./pages/ForgotPassword";
import GenericOdkForm from "./pages/forms/GenericOdkForm";
import ROUTE_MAP from "./services/routing/routeMap";
import Login from "./pages/login/page";
import PrivateRoute from "./services/routing/PrivateRoute/PrivateRoute";
import { getCookie, getFromLocalForage, setToLocalForage } from "./services/utils";
import AssessmentType from "./pages/AssessmentType/page";
import toast, { Toaster } from 'react-hot-toast';
import { saveDataToHasura } from "./services/api";
import { useServiceWorker } from "./hooks/useServiceWorker";
import CommonModal from "./components/Modal";
export const StateContext = createContext();

function App() {
  
  const [state, setState] = useState();
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();
  const [envModal, showEnvModal] = useState(false);
  const [envs, setEnvs] = useState({
    ENKETO_URL: "",
    ENKETO_MANAGER_URL: "",
    OPEN_ROSA_SERVER_URL: ""
  });

  useEffect(() => {
    const user = getCookie("userData");
  }, []);

  useEffect(() => {
    if (showReload && waitingWorker) {
      toast((t) => (
        <span>
          New Version Available
          <button onClick={() => window.location.reload()}>
            Refresh
          </button>
        </span>
      ));
    } else {

    };
  }, [waitingWorker, showReload, reloadPage]);

  useEffect(() => {
    window.addEventListener('online', async () => {
      let syncData = await getFromLocalForage('syncData');
      if (syncData) {
        toast('Syncing saved data with server')
        let appData = await getFromLocalForage('appData');
        saveDataToHasura({
          text_input: appData.textData,
          date_input: appData.dateData
        })
      }
      setToLocalForage('syncData', false);
    })

    window.addEventListener('offline', () => {
      toast('App is now in offline mode :)')
    })
  }, [])

  const checkEnvsForApp = async () => {
    let appEnvs = await getFromLocalForage('appEnvs', false) || {};
    if (Object.keys(appEnvs).length == 0)
      showEnvModal(true);
  }

  const setEnvsForApp = async () => {
    if (!envs.ENKETO_MANAGER_URL || !envs.ENKETO_URL || !envs.OPEN_ROSA_SERVER_URL)
      return;
    await setToLocalForage('appEnvs', envs, false);
    showEnvModal(false);
  }

  useEffect(() => {
    checkEnvsForApp()
  }, [])

  return (
    <div className="App">
      <StateContext.Provider value={{ state, setState }}>
        <BrowserRouter>
          <div style={{ opacity: 0, position: 'absolute', zIndex: -1 }}>
            <GenericOdkForm />
          </div>
          <Routes>
            <Route
              path={ROUTE_MAP.root}
              element={
                <PrivateRoute>
                  <MedicalAssessor />
                </PrivateRoute>
              }
            />
            <Route path={ROUTE_MAP.login} element={<Login />} />
            {/*to cache start */}
            <Route
              path={ROUTE_MAP.medical_assessments}
              element={
                <PrivateRoute>
                  <MedicalAssessments />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTE_MAP.upcoming_medical_assessments}
              element={
                <PrivateRoute>
                  <UpcomingMedicalAssessments />
                </PrivateRoute>
              }
            />
            {/*to cache  end */}

            <Route
              path={ROUTE_MAP.capture_location}
              element={
                <PrivateRoute>
                  <CaptureLocation />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTE_MAP.forgot_password}
              element={<ForgotPassword />}
            />
            <Route
              path={ROUTE_MAP.assessment_type}
              element={
                <PrivateRoute>
                  <AssessmentType />
                </PrivateRoute>
              }
            />
            <Route
              path={`${ROUTE_MAP.otherforms_param_formName}:formName`}
              element={
                <PrivateRoute>
                  <GenericOdkForm />
                </PrivateRoute>
              }
            />
           
            <Route path={ROUTE_MAP.root_star} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
      <Toaster />
      {envModal && <CommonModal>
        <div>
          <p className="text-secondary text-xl lg:text-3xl text-semibold font-medium text-center">
            Please set the following envs before proceeding
          </p>
          <div className="h-full w-full bg-tertiary flex flex-col wrap items-center pt-4 pb-8 px-5 mt-4 animate__animated animate__fadeIn animate__slow overflow-scroll">
            <div className="flex flex-col py-3 w-full ">
              <span className="text-secondary pb-2 font-medium">
                Enketo Express URL
              </span>
              <input
                type="text"
                className="border-2 border-primary p-3.5"
                value={envs.ENKETO_URL}
                onChange={(e) => setEnvs((envs) => ({ ...envs, ENKETO_URL: e.target.value }))}
              />
            </div>
            <div className="flex flex-col py-3 w-full ">
              <span className="text-secondary pb-2 font-medium">
                Form Manager URL
              </span>
              <input
                type="text"
                className="border-2 border-primary p-3.5"
                value={envs.ENKETO_MANAGER_URL}
                onChange={(e) => setEnvs((envs) => ({ ...envs, ENKETO_MANAGER_URL: e.target.value }))}
              />
            </div>
            <div className="flex flex-col py-3 w-full ">
              <span className="text-secondary pb-2 font-medium">
                Centro Server URL
              </span>
              <input
                type="text"
                className="border-2 border-primary p-3.5"
                value={envs.OPEN_ROSA_SERVER_URL}
                onChange={(e) => setEnvs((envs) => ({ ...envs, OPEN_ROSA_SERVER_URL: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center w-full py-4 mt-5">
            <div
              className={`border border-primary bg-primary text-white py-1 px-7 cursor-pointer lg:px-16 lg:py-3 lg:text-xl ${(!envs.ENKETO_MANAGER_URL || !envs.ENKETO_URL || !envs.OPEN_ROSA_SERVER_URL) && 'opacity-50'}`}
              onClick={() => setEnvsForApp()}
            >
              Set Envs
            </div>
          </div>
        </div>
      </CommonModal>}
    </div>
  );
  
}

export default App;
