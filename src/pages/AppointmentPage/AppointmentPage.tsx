import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FirstForm, SecondForm, Stepper } from "../../components";
import SelectDateForm from "../../components/SelectDateForm/SelectDateForm";
import {
  AvailableDateType,
  AvailableScheduleItem,
  ScheduleVariantsEnum,
} from "../../models/Hospital";
import {
  appointmentActions,
  getAppointmentUserData,
  getSchedulesByDoctor,
} from "../../store/actions/appointment";
import { hospitalsActions } from "../../store/actions/hospitals";
import {
  getAppointmentErrorMessageState,
  getAppointmentUserDataState,
} from "../../store/selectors/appointment";
import { getHospitalsErrorState } from "../../store/selectors/hospitals";

const steps = [
  { title: "Заполните форму" },
  { title: "Информация" },
  { title: "Выберите врача" },
  { title: "Выберите время приема" },
];

const AppointmentPage = () => {
  const [step, setStep] = useState(0);
  const [IIN, setIIN] = useState("");
  const [hospitalId, setHospitalId] = useState<string>("0");
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);

  const [ngDate, setNgDate] = React.useState<string | null>(null);
  const [ngTime, setNgTime] = React.useState<AvailableDateType | null>(null);
  const [ngScheduleData, setNgScheduleData] =
    React.useState<AvailableScheduleItem | null>(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orgId = searchParams.get("OrgID");
    if (orgId) {
      setHospitalId(orgId);
    }
  }, [searchParams]);

  const dispatch = useDispatch();

  const hospitalError = useSelector(getHospitalsErrorState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const appointmentUserData = useSelector(getAppointmentUserDataState);

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
    dispatch(
      getSchedulesByDoctor("867", "7a914a5c-30c4-11ec-8b30-00155d0a8602", [
        ScheduleVariantsEnum.NO_RESTRICTION,
        ScheduleVariantsEnum.DISTRICT,
      ])
    );
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
            hospitalId={hospitalId}
            setHospitalId={setHospitalId}
            clearError={clearFirstFormError}
          />
        );

      case 1:
        return (
          <SecondForm
            goBack={backFromSecondForm}
            submitForm={submitSecondForm}
            clearError={backFromSecondForm}
            hospitalId={hospitalId}
          />
        );

      case 3:
        return <SelectDateForm />;

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
