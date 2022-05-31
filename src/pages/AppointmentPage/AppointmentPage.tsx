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
  RecordMethodType,
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
  createNGAppointment,
  getAppointmentUserData,
  getDoctors,
  getNGSchedules,
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

  const [attachmentRecordType, setAttachmentRecordType] =
    useState<RecordAttachmentType>("К участковому врачу");
  const [recordType, setRecordType] = useState<RecordMethodType>("По ФИО");

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

  useEffect(() => {
    document.title = "Запись на прием online";
  }, []);

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
    const orgId = appointmentUserData?.AttachmentID;
    const familyDoctorId = appointmentUserData?.DoctorID;

    if (orgId) {
      if (attachmentRecordType === "К участковому врачу" && familyDoctorId) {
        dispatch(
          // getSchedulesByDoctor(orgId, familyDoctorId, [
          getSchedulesByDoctor("867", "7a914a5c-30c4-11ec-8b30-00155d0a8602", [
            ScheduleVariantsEnum.NO_RESTRICTION,
            ScheduleVariantsEnum.DISTRICT,
          ])
        );
        setStep(3);
      } else {
        dispatch(getDoctors(orgId));
        setStep(2);
      }
    }
  };

  const handleOtherHospitals = () => {
    const error = appointmentUserData?.OrgErrors?.find(
      (item) => item.OrgID === hospitalId
    );

    if (error) {
      dispatch(appointmentActions.setAppointmentError(error.ErrorText));
    } else {
      dispatch(appointmentActions.setNGDoctors(null));
      dispatch(appointmentActions.setNGSpecialities(null));
      dispatch(getDoctors(hospitalId));
      setStep(2);
    }
  };
  /***************************/

  // Обработка 3 формы
  const submitSelectScheduleForm = () => {
    const orgId =
      hospitalId === "0" ? appointmentUserData?.AttachmentID : hospitalId;
    const doctorId = ngDoctor?.doctor_id;
    const specialityId = ngSpeciality?.doc_speciality_id;

    if (orgId) {
      switch (recordType) {
        case "По ФИО": {
          if (doctorId) {
            dispatch(
              // getSchedulesByDoctor(orgId, doctorId, [
              getSchedulesByDoctor(
                "867",
                "7a914a5c-30c4-11ec-8b30-00155d0a8602",
                [
                  ScheduleVariantsEnum.NO_RESTRICTION,
                  hospitalId === "0"
                    ? ScheduleVariantsEnum.PROFILE
                    : ScheduleVariantsEnum.PAID,
                ]
              )
            );
            setStep(3);
          }
          break;
        }

        case "По специализации": {
          if (specialityId) {
            // dispatch(getNGSchedules(orgId, specialityId));
            dispatch(
              getNGSchedules("867", specialityId, [
                ScheduleVariantsEnum.NO_RESTRICTION,
                hospitalId === "0"
                  ? ScheduleVariantsEnum.PROFILE
                  : ScheduleVariantsEnum.PAID,
              ])
            );
            setStep(3);
          }
          break;
        }

        default:
          break;
      }
    }
  };

  const backFromSelectScheduleForm = () => {
    if (appointmentError) {
      dispatch(appointmentActions.setAppointmentError(null));
    }
    dispatch(appointmentActions.setNGDoctors(null));
    dispatch(appointmentActions.setNGSpecialities(null));
    setNGSpeciality(null);
    setNGDoctor(null);
    setStep(1);
  };

  const clearErrorSelectScheduleForm = () => {
    dispatch(appointmentActions.setAppointmentError(null));
  };

  /***************************/

  // Обработка выбора даты

  const backFromSelectDate = () => {
    if (appointmentError) {
      dispatch(appointmentActions.setAppointmentError(null));
    }
    dispatch(appointmentActions.setNGAvailablesDate(null));
    setNgDate(null);
    setNGDoctor(null);
    setNGSpeciality(null);
    setNgScheduleData(null);
    setStep(3);
  };

  const createAppointment = () => {
    // const appointmentIIN = appointmentUserData ? IIN : myIIN;
    // const orgId = hospital?.OrgID;
    // const schedule_id = ngScheduleData?.schedule_id;
    // const doctorName = ngDoctor?.full_name;
    // const appointment_date = ngTime?.date_begin;
    // const room_description = ngScheduleData?.room_description;
    // const schedule_name = ngScheduleData?.schedule_name;
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
            attachmentRecordType={attachmentRecordType}
            setAttachmentRecordType={setAttachmentRecordType}
          />
        );

      case 2:
        return (
          <SelectScheduleForm
            hospitalId={hospitalId}
            submitForm={submitSelectScheduleForm}
            clearError={clearErrorSelectScheduleForm}
            goBack={backFromSelectScheduleForm}
            selectedDoctor={ngDoctor}
            setDoctor={setNGDoctor}
            selectedSpeciality={ngSpeciality}
            setSpecialities={setNGSpeciality}
            recordType={recordType}
            setRecordType={setRecordType}
          />
        );

      case 3:
        return (
          <SelectDateForm
            goBack={backFromSelectDate}
            submitForm={createAppointment}
          />
        );

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
