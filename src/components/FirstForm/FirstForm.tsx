import React, { ChangeEvent, FC, useState } from "react";
import { Button, Col, Input, Row, Select, Typography } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

import { FirstFormProps } from "./FirstForm.props";

const { Title, Text } = Typography;
const { Option } = Select;

export const FirstForm: FC<FirstFormProps> = ({ submitForm }) => {
  const [IIN, setIIN] = useState("");
  const [hospital, setHospital] = useState("Поликлиника прикрепления");
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);
  const onChange = (token: string | null) => {
    setCaptchaResp(token);
  };

  const handleChangeIIN = (e: ChangeEvent<HTMLInputElement>) => {
    setIIN(e.target.value);
  };

  const handleChangeHospital = (hospital: string) => {
    setHospital(hospital);
  };

  return (
    <Col xl={14} lg={16} md={20} sm={24} className="form">
      <Row justify="center">
        <Title className="title">Запись на приём online</Title>
      </Row>
      <Row justify="center">
        <Col md={14} sm={20} className="input_wrapper">
          <Text className="subtitle">Выберите организацию</Text>
          <Select
            defaultValue={hospital}
            size="large"
            className="select"
            onChange={handleChangeHospital}
          >
            <Option value="Поликлиника прикрепления">
              Поликлиника прикрепления
            </Option>
            <Option value="Взрослая областная">Взрослая областная</Option>
            <Option value="Есиль диагностик">Есиль диагностик</Option>
            <Option value="Обл. стоматологическая поликлиника">
              Обл. стоматологическая поликлиника
            </Option>
          </Select>
        </Col>
        <Col md={14} sm={20} className="input_wrapper">
          <Text className="subtitle">Введите ИИН</Text>
          <Input
            placeholder="Введите ИИН"
            size="large"
            className="input"
            maxLength={12}
            onChange={handleChangeIIN}
          />
        </Col>
      </Row>
      <Row justify="center" className="captcha">
        <ReCAPTCHA
          sitekey="6LfDIvIbAAAAADAA-OmE0fOpkthXu2BYqzgHjqFI"
          onChange={onChange}
        />
      </Row>
      <Row justify="center">
        <Button
          type="primary"
          size="large"
          disabled={
            IIN.length !== 12 || !Boolean(captchaResp) || !Boolean(hospital)
          }
          onClick={submitForm}
        >
          Продолжить
        </Button>
      </Row>
    </Col>
  );
};
