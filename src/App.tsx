import React, { useEffect, useState } from "react";
import { Col, Row, Grid } from "antd";

import Layout from "./layout/Layout";
import { FirstForm, SecondForm, Stepper } from "./components";
import axios from "axios";
import { IUserData } from "./models/Appointment";
import { useGetOrgsListForAppointmentQuery } from "./services/AppointmentService";

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
  const {
    data: orgList,
    isLoading: orgsListLoading,
    error: orgsListError,
  } = useGetOrgsListForAppointmentQuery();

  useEffect(() => {
    const getOrgListForTimetable = () => {
      console.log("getOrgListForTimetable ....");
    };

    getOrgListForTimetable();
  }, []);

  // Обработка 1 формы

  const submitFirstForm = async () => {
    const { data } = await axios.get<IUserData>(
      `https://localhost:3032/patient?IIN=${IIN}`
    );

    console.log("data.FIO --> ", data.FIO);

    if (hospital === "Поликлиника прикрепления") {
      setStep(1);
    } else {
      setStep(1);
    }
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
            orgList={orgList?.Orgs}
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
        {md && (
          <Col span={24}>
            <Stepper steps={steps} current={step} status="process" />
          </Col>
        )}
        {renderForm()}
      </Row>
    </Layout>
  );
}

export default App;
