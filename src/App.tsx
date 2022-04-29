import React, { useEffect, useState } from "react";
import { Col, Row, Grid } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import { FirstForm, Preloader, SecondForm, Stepper } from "./components";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentErrorMessageState,
  getAppointmentUserDataLoadingState,
  getAppointmentUserDataState,
} from "./store/selectors/appointment";
import { getHospitalsForAppointment } from "./store/actions/hospitals";
import { getHospitalsForAppointmentState } from "./store/selectors/hospitals";
import { getAppointmentUserData } from "./store/actions/appointment";
import { AppointmentPage, HouseCallPage, SickListPage } from "./pages";

const steps = [
  { title: "Заполните форму" },
  { title: "Выберите специализацию" },
  { title: "Выберите врача" },
  { title: "Выберите время приема" },
];

// const screens = {
//   lg: 992,
//   md: 768,
//   sm: 576,
//   xl: 1200,
//   xs: true,
//   xxl: 1600,
// };

const { useBreakpoint } = Grid;

function App() {
  const [step, setStep] = useState(0);
  const [IIN, setIIN] = useState("");
  const [hospital, setHospital] = useState("Поликлиника прикрепления");
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);

  const { md } = useBreakpoint();

  const dispatch = useDispatch();

  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const appointmentData = useSelector(getAppointmentUserDataState);
  const appointmentDataLoading = useSelector(
    getAppointmentUserDataLoadingState
  );

  const hospitalsForAppointment = useSelector(getHospitalsForAppointmentState);

  useEffect(() => {
    dispatch(getHospitalsForAppointment());
  }, [dispatch]);

  // Обработка 1 формы

  const submitFirstForm = async () => {
    dispatch(getAppointmentUserData(IIN));
    // if (hospital === "Поликлиника прикрепления") {
    //   setStep(1);
    // } else {
    //   setStep(1);
    // }
  };

  // Обработка 2 формы

  const saveAppointment = () => {};

  const goBackFromSecondForm = () => {
    setStep(0);
  };

  const handleSelectDoctor = () => {
    setStep(3);
  };

  const renderForm = () => {
    switch (step) {
      case 0: {
        return (
          <FirstForm
            submitForm={submitFirstForm}
            IIN={IIN}
            setIIN={setIIN}
            captchaResp={captchaResp}
            setCaptchaResp={setCaptchaResp}
            hospital={hospital}
            setHospital={setHospital}
            orgList={hospitalsForAppointment}
          />
        );
      }

      case 1: {
        return (
          <SecondForm
            goBack={goBackFromSecondForm}
            submitForm={saveAppointment}
          />
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <Layout>
      <Row justify="center">
        <Routes>
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/house-call" element={<HouseCallPage />} />
          <Route path="/sicklist" element={<SickListPage />} />
          <Route path="*" element={<Navigate to="/appointment" />} />
        </Routes>
        {/* {md && (
          <Col span={24}>
            <Stepper steps={steps} current={step} status="process" />
          </Col>
        )}
        {appointmentError && <Title>{appointmentError}</Title>}
        {appointmentDataLoading ? <Preloader /> : renderForm()}
        {appointmentData && (
          <Text>{JSON.stringify(appointmentData, null, 2)}</Text>
        )} */}
      </Row>
    </Layout>
  );
}

export default App;
