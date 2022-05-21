import { Grid, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  FirstForm,
  SecondForm,
  Stepper,
  SelectDateForm,
  SelectScheduleForm,
} from "../../components";
import {
  RecordAttachmentType,
  RecordMetodsType,
} from "../../models/Appointment";
import {
  AvailableDateType,
  AvailableScheduleItem,
  GetDoctorsItemType,
  ScheduleVariantsEnum,
  SpecialitiesType,
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
  { title: "Подтвердите информацию" },
  { title: "Выберите способ записи" },
  { title: "Выберите время приема" },
];

const { useBreakpoint } = Grid;

const AppointmentPage = () => {
  const [step, setStep] = useState(0);
  const [IIN, setIIN] = useState("");
  const [hospitalId, setHospitalId] = useState<string>("0");
  const [captchaResp, setCaptchaResp] = useState<string | null>(null);

  const [recordType, setRecordType] = useState<RecordAttachmentType>(
    "К участковому врачу"
  );

  const [ngDate, setNgDate] = React.useState<string | null>(null);
  const [ngTime, setNgTime] = React.useState<AvailableDateType | null>(null);
  const [ngScheduleData, setNgScheduleData] =
    React.useState<AvailableScheduleItem | null>(null);

  const [ngSpeciality, setNGSpeciality] =
    React.useState<SpecialitiesType | null>(null);
  const [ngDoctor, setNGDoctor] = React.useState<GetDoctorsItemType | null>(
    null
  );

  const [searchParams] = useSearchParams();

  const { md, xl } = useBreakpoint();

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
  };

  const submitSecondForm = () => {
    if (hospitalId === "0") {
      handleAttachmentPolyclinic();
    } else {
      handleOtherHospitals();
    }
  };

  const handleAttachmentPolyclinic = () => {
    if (
      recordType === "К участковому врачу" &&
      appointmentUserData?.AttachmentID &&
      appointmentUserData?.DoctorID
    ) {
      dispatch(
        // getSchedulesByDoctor(appointmentUserData.AttachmentID, appointmentUserData.DoctorID, [
        getSchedulesByDoctor("867", "7a914a5c-30c4-11ec-8b30-00155d0a8602", [
          ScheduleVariantsEnum.NO_RESTRICTION,
          ScheduleVariantsEnum.DISTRICT,
        ])
      );
      setStep(3);
    } else {
      //TODO: запись к узким
      setStep(2);
    }
  };

  const handleOtherHospitals = () => {
    const error = appointmentUserData?.OrgErrors?.find(
      (item) => item.OrgID === hospitalId
    );

    if (error) {
      dispatch(appointmentActions.setAppointmentError(error.ErrorText));
    } else {
      setStep(2);
    }
  };

  /***************************/
  // Обработка 3 формы
  const submitSelectScheduleForm = () => {};

  const backFromSelectScheduleForm = () => {
    if (appointmentError) {
      dispatch(appointmentActions.setAppointmentError(null));
    }
    setNGSpeciality(null);
    setNGDoctor(null);
    setStep(1);
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
            recordType={recordType}
            setRecordType={setRecordType}
          />
        );

      case 2:
        return (
          <SelectScheduleForm
            hospitalId={hospitalId}
            submitForm={submitSelectScheduleForm}
            clearError={backFromSelectScheduleForm}
            goBack={backFromSelectScheduleForm}
            selectedDoctor={ngDoctor}
            setDoctor={setNGDoctor}
            selectedSpeciality={ngSpeciality}
            setSpecialities={setNGSpeciality}
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
      {md && (
        <Stepper
          steps={steps}
          current={step}
          status={
            hospitalError ? "error" : appointmentError ? "error" : "process"
          }
          size={xl ? "default" : "small"}
        />
      )}
      <Row justify="center" className="h100" align="middle">
        {renderContent()}
      </Row>
    </>
  );
};

export default AppointmentPage;
