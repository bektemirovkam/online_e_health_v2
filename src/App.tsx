import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Typography, Select, Input, Button, Row, Col } from "antd";

import Layout from "./layout/Layout";
import { FirstForm, SecondForm, Stepper } from "./components";

const steps = [
  { title: "Заполните форму" },
  { title: "Выберите специализацию" },
  { title: "Выберите врача" },
  { title: "Выберите время приема" },
];

const { useBreakpoint } = Grid;
const { Text, Title } = Typography;
const { Option } = Select;

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

  const { md } = useBreakpoint();

  useEffect(() => {
    const getOrgListForTimetable = () => {
      console.log("getOrgListForTimetable ....");
    };

    getOrgListForTimetable();
  }, []);

  const submitFirstForm = () => {
    setStep(1);
  };

  const submitSecondForm = () => {
    setStep(2);
  };
  const goBackFromSecondForm = () => {
    setStep(0);
  };

  const renderForm = () => {
    switch (step) {
      case 0: {
        return <FirstForm submitForm={submitFirstForm} />;
      }

      case 1: {
        return (
          <SecondForm
            goBack={goBackFromSecondForm}
            submitForm={submitSecondForm}
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
