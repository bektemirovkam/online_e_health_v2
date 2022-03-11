import React from "react";
import { Grid, Typography, Select, Input, Button, Row, Col } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

import Layout from "./layout/Layout";
import { Preloader, Stepper } from "./components";

const steps = [
  { title: "Заполните форму" },
  { title: "Выберите специализацию" },
  { title: "Выберите врача" },
  { title: "Выберите время приема" },
];

const { useBreakpoint } = Grid;
const { Text, Title } = Typography;
const { Option } = Select;

function App() {
  const { md } = useBreakpoint();

  const onChange = (token: string | null) => {
    console.log("Captcha value:", token);
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Col span={24}>
          <Stepper steps={steps} current={0} status="finish" />
        </Col>
        <Col xs={24} lg={20} className="iin_form">
          <Row justify="center">
            <Title>Запись на приём online</Title>
          </Row>
          <Row justify="center">
            <Col lg={14} className="input_wrapper">
              <Text className="subtitle">Выберите организацию</Text>
              <Select
                defaultValue="Поликлиника прикрепления"
                size="large"
                className="select"
              >
                <Option value="Поликлиника прикрепления">
                  Поликлиника прикрепления
                </Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col lg={14} className="input_wrapper">
              <Text className="subtitle">Введите ИИН</Text>
              <Input placeholder="Введите ИИН" size="large" className="input" />
            </Col>
          </Row>
        </Col>
        <ReCAPTCHA
          sitekey="6LfDIvIbAAAAADAA-OmE0fOpkthXu2BYqzgHjqFI"
          onChange={onChange}
        />
      </Row>
      {/* <Preloader /> */}
    </Layout>
  );
}

export default App;
