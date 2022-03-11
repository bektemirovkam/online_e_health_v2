import React, { useEffect, useState } from "react";
import { Row } from "antd";

import Layout from "./layout/Layout";
import { FirstForm, SecondForm } from "./components";
import axios from "axios";

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

function App() {
  const [step, setStep] = useState(0);

  const [IIN, setIIN] = useState("");
  const [hospital, setHospital] = useState("Поликлиника прикрепления");
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);

  useEffect(() => {
    const getOrgListForTimetable = () => {
      console.log("getOrgListForTimetable ....");
    };

    getOrgListForTimetable();
  }, []);

  // Обработка 1 формы

  const submitFirstForm = async () => {
    const response = await axios.get(
      `https://localhost:3032/getpatient?IIN=${IIN}`
    );

    console.log("response --> ", response);

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
            steps={steps}
          />
        );
      }

      case 1: {
        return (
          <SecondForm
            goBack={goBackFromSecondForm}
            submitForm={saveAppointment}
            steps={steps}
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
      <Row justify="center">{renderForm()}</Row>
    </Layout>
  );
}

export default App;
