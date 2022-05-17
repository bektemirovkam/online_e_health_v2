import React, { ChangeEvent, FC, useEffect } from "react";
import { Button, Col, Input, Modal, Row, Select, Typography } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";

import { FirstFormProps } from "./FirstForm.props";
import { getAppointmentErrorMessageState } from "../../store/selectors/appointment";
import {
  getHospitalsErrorState,
  getHospitalsForAppointmentState,
} from "../../store/selectors/hospitals";

const { Title, Text } = Typography;
const { Option } = Select;

export const FirstForm: FC<FirstFormProps> = ({
  submitForm,
  setCaptchaResp,
  setIIN,
  setHospitalId,
  hospitalId,
  IIN,
  captchaResp,
  clearError,
}) => {
  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const hospitalsForAppointment = useSelector(getHospitalsForAppointmentState);
  const hospitalError = useSelector(getHospitalsErrorState);

  const onChange = (token: string | null) => {
    setCaptchaResp(token);
  };

  const handleChangeIIN = (e: ChangeEvent<HTMLInputElement>) => {
    setIIN(e.target.value);
  };

  const handleChangeHospital = (hospitalId: string) => {
    setHospitalId(hospitalId);
  };

  useEffect(() => {
    if (hospitalError || appointmentError) {
      Modal.error({
        title: "Ошибка",
        content: hospitalError || appointmentError,
        onOk: clearError,
      });
    }
  }, [hospitalError, appointmentError, clearError]);

  return (
    <Col xl={14} lg={16} md={20} sm={24} className="form">
      <Row justify="center">
        <Title className="title">Запись на приём online</Title>
      </Row>
      <Row justify="center">
        <Col md={18} sm={20} className="input_wrapper">
          <Text className="subtitle">Выберите организацию</Text>
          <Select
            defaultValue={"0"}
            size="large"
            className="select"
            //@ts-ignore
            onChange={handleChangeHospital}
            value={hospitalId}
          >
            {hospitalsForAppointment &&
              hospitalsForAppointment.map((org) => (
                <Option key={org.OrgID} value={org.OrgID}>
                  {org.Name}
                </Option>
              ))}
          </Select>
        </Col>
        <Col md={18} sm={20} className="input_wrapper">
          <Text className="subtitle">Введите ИИН</Text>
          <Input
            placeholder="Введите ИИН"
            size="large"
            className="input"
            maxLength={12}
            onChange={handleChangeIIN}
            value={IIN}
          />
        </Col>
      </Row>
      {/* <Row justify="center" className="captcha">
        <ReCAPTCHA
          sitekey="6LfDIvIbAAAAADAA-OmE0fOpkthXu2BYqzgHjqFI"
          onChange={onChange}
        />
      </Row> */}
      <Row justify="center">
        <Button
          type="primary"
          size="large"
          disabled={
            // !Boolean(captchaResp) ||
            IIN.length !== 12 || !Boolean(hospitalId)
          }
          onClick={submitForm}
        >
          Продолжить
        </Button>
      </Row>
    </Col>
  );
};
