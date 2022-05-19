import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Alert,
} from "antd";
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

const checkIIN = (IIN: string) => {
  const regex = /^(\d{12})$/;
  return regex.test(IIN);
};

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
  const [hospitalWarning, setHospitalWarning] = useState<null | string>(null);

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
    if (setHospitalWarning) {
      setHospitalWarning(null);
    }

    const selectedHospitalInfo = hospitalsForAppointment?.find(
      (orgInfo) => orgInfo.OrgID === hospitalId
    );

    if (selectedHospitalInfo?.ShowMessage && selectedHospitalInfo.MessageText) {
      setHospitalWarning(selectedHospitalInfo.MessageText);
    }

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
    <Row justify="center">
      <Col>
        {hospitalWarning && (
          <Row justify="center">
            <Col sm={16}>
              <Alert
                description={hospitalWarning}
                type="warning"
                showIcon
                closable
              />
            </Col>
          </Row>
        )}
      </Col>
      <Col className="form">
        <Row justify="center">
          <Title className="title">Запись на приём online</Title>
        </Row>
        <Row justify="center">
          <Col sm={14} className="input_wrapper">
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
          <Col sm={14} className="input_wrapper">
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
              !checkIIN(IIN) || !Boolean(hospitalId)
            }
            onClick={submitForm}
          >
            Продолжить
          </Button>
        </Row>
      </Col>
    </Row>
  );
};
