import { Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirstForm, SecondForm, Stepper } from "../../components";
import { ISelectHospital } from "../../components/FirstForm/FirstForm.props";
import {
  appointmentActions,
  getAppointmentUserData,
} from "../../store/actions/appointment";
import { hospitalsActions } from "../../store/actions/hospitals";
import { getAppointmentErrorMessageState } from "../../store/selectors/appointment";
import { getHospitalsErrorState } from "../../store/selectors/hospitals";

const steps = [
  { title: "Заполните форму" },
  { title: "Информация" },
  { title: "Выберите врача" },
  { title: "Выберите время приема" },
];

const defaultHospital = {
  key: "0",
  value: "0",
  children: "Поликлиника прикрепления",
};

const AppointmentPage = () => {
  const [step, setStep] = useState(0);
  const [IIN, setIIN] = useState("");
  const [hospital, setHospital] = useState<ISelectHospital>(defaultHospital);
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);

  const dispatch = useDispatch();

  const hospitalError = useSelector(getHospitalsErrorState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);

  // Обработка 1 формы
  const submitFirstForm = async () => {
    dispatch(getAppointmentUserData(IIN));
    setStep(1);
  };

  const clearFirstFormError = () => {
    if (hospitalError) {
      dispatch(hospitalsActions.setHospitalsError(null));
    }
    if (appointmentError) {
      dispatch(appointmentActions.setAppointmentError(null));
    }
  };
  /***************************/

  // Обработка 2 формы

  const backFromSecondForm = () => {
    if (appointmentError) {
      dispatch(appointmentActions.setAppointmentError(null));
    }
    setStep(0);
    dispatch(appointmentActions.setAppointmentUserData(null));
  };

  const submitSecondForm = () => {
    console.log("2 form");
  };
  /***************************/

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <FirstForm
            submitForm={submitFirstForm}
            IIN={IIN}
            setIIN={setIIN}
            captchaResp={captchaResp}
            setCaptchaResp={setCaptchaResp}
            hospital={hospital}
            setHospital={setHospital}
            clearError={clearFirstFormError}
          />
        );

      case 1:
        return (
          <SecondForm
            goBack={backFromSecondForm}
            submitForm={submitSecondForm}
            clearError={backFromSecondForm}
            hospital={hospital}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Stepper
        steps={steps}
        current={step}
        status={
          hospitalError ? "error" : appointmentError ? "error" : "process"
        }
      />
      <Row justify="center" className="h100">
        {renderContent()}
      </Row>
    </>
  );
};

export default AppointmentPage;
