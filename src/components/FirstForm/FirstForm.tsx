import React, { ChangeEvent, FC, useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Alert,
  Grid,
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
const { useBreakpoint } = Grid;

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

  const { sm } = useBreakpoint();

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

  if (appointmentError || hospitalError) {
    return (
      <Modal
        title="Ошибка"
        onCancel={clearError}
        onOk={clearError}
        cancelText="Закрыть"
        visible
        centered
      >
        {appointmentError && <p>{appointmentError}</p>}
        {hospitalError && <p>{hospitalError}</p>}
      </Modal>
    );
  }

  return (
    <>
      {hospitalWarning && (
        <Col>
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
        </Col>
      )}
      <Col className="form">
        <Row justify="center">
          <Title className="title">Запись на приём online</Title>
        </Row>
        <Row justify="center">
          <Col sm={14} className="input_wrapper">
            <Text className="subtitle">Выберите организацию</Text>
            <Select
              defaultValue={"0"}
              size={sm ? "large" : "middle"}
              className="select"
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
              size={sm ? "large" : "middle"}
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
            size={sm ? "large" : "middle"}
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
    </>
  );
};
