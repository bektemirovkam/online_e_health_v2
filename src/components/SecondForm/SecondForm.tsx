import React, { ChangeEvent, FC, useState } from "react";
import { Button, Col, Input, Row, Select, Typography, Grid } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

import { SecondFormProps } from "./SecondForm.props";
import { Stepper } from "../Stepper/Stepper";

const { Title, Text } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

export const SecondForm: FC<SecondFormProps> = ({
  goBack,
  submitForm,
  steps,
}) => {
  const [IIN, setIIN] = useState("");
  const [hospital, setHospital] = useState("Поликлиника прикрепления");
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);
  const onChange = (token: string | null) => {
    setCaptchaResp(token);
  };

  const { md } = useBreakpoint();

  const handleChangeIIN = (e: ChangeEvent<HTMLInputElement>) => {
    setIIN(e.target.value);
  };

  const handleChangeHospital = (hospital: string) => {
    setHospital(hospital);
  };

  return (
    <>
      {md && (
        <Col span={24}>
          <Stepper steps={steps} current={1} status="process" />
        </Col>
      )}
      <Col xl={14} lg={16} md={20} sm={24} className="form">
        <Row justify="center">
          <Title className="title">Запись на приём online</Title>
        </Row>
        <Row justify="center">
          <Col md={14} sm={20} className="input_wrapper">
            <Text className="subtitle">Выберите дату</Text>
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
            <Text className="subtitle">Выберите время</Text>
            <Input
              placeholder="Введите ИИН"
              size="large"
              className="input"
              maxLength={12}
              onChange={handleChangeIIN}
            />
          </Col>
        </Row>

        <Row justify="space-between">
          <Button size="large" type="default" onClick={goBack}>
            Назад
          </Button>
          <Button type="primary" size="large" onClick={submitForm}>
            Продолжить
          </Button>
        </Row>
      </Col>
    </>
  );
};
