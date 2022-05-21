import {
  Button,
  Col,
  Modal,
  Row,
  Segmented,
  Select,
  Typography,
  Grid,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { SegmentedValue } from "antd/lib/segmented";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { SelectScheduleFormProps } from "./SelectScheduleForm.props";
import styles from "./SelectScheduleForm.module.css";
import { RecordMethodType } from "../../models/Appointment";
import { getDoctors, getSpecialities } from "../../store/actions/appointment";
import {
  getDoctorsLoadingState,
  getDoctorsState,
  getSpecialitiesState,
  getSpecialitiesLoadingState,
  getAppointmentErrorMessageState,
} from "../../store/selectors/appointment";
import { DoctorSelect } from "../DoctorSelect/DoctorSelect";
import { SpecialitySelect } from "../SpecialitySelect/SpecialitySelect";

const { Text } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

export const SelectScheduleForm: FC<SelectScheduleFormProps> = ({
  hospitalId,
  submitForm,
  goBack,
  clearError,
  selectedDoctor,
  setDoctor,
  selectedSpeciality,
  setSpecialities,
}) => {
  const [recordType, setRecordType] = useState<RecordMethodType>("По ФИО");

  const doctors = useSelector(getDoctorsState);
  const doctorsLoading = useSelector(getDoctorsLoadingState);

  const specialities = useSelector(getSpecialitiesState);
  const specialitiesLoading = useSelector(getSpecialitiesLoadingState);

  const appointmentError = useSelector(getAppointmentErrorMessageState);

  const dispatch = useDispatch();
  const { sm } = useBreakpoint();

  useEffect(() => {
    if (doctors) {
      setDoctor(doctors[0]);
    }
  }, [doctors, setDoctor]);

  useEffect(() => {
    if (specialities) {
      setSpecialities(specialities[0]);
    }
  }, [setSpecialities, specialities]);

  useEffect(() => {
    if (recordType === "По ФИО") {
      // dispatch(getDoctors(hospitalId, null));
      // dispatch(getDoctors("867", null));
    } else if (recordType === "По специализации") {
      // dispatch(getSpecialities(hospitalId, null));
      // dispatch(getSpecialities("867", null));
    }
  }, [dispatch, recordType]);

  useEffect(() => {
    if (appointmentError) {
      Modal.error({
        title: "Ошибка",
        content: appointmentError,
        onOk: clearError,
      });
    }
  }, [appointmentError, clearError]);

  const handleChangeRecordMethod = (value: SegmentedValue) => {
    setRecordType(value as RecordMethodType);
  };

  const handleChangeDoctor = (doctorId: string) => {
    const selectedDoctor = doctors.find((doc) => doc.doctor_id === doctorId);
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
    }
  };

  const handleChangeSpeciality = (specialityId: string) => {
    const selectedSpeciality = specialities?.find(
      (spec) => spec.doc_speciality_id === specialityId
    );
    if (selectedSpeciality) {
      console.log(selectedSpeciality);
    }
  };

  return (
    <>
      <Col className={cn("form", styles.form)}>
        <Row justify="center">
          <Col className="input_wrapper">
            <Text className="subtitle">Способ выбора врача</Text>
            <Segmented
              options={["По ФИО", "По специализации"]}
              onChange={handleChangeRecordMethod}
              value={recordType}
              disabled={doctorsLoading || specialitiesLoading}
              size={sm ? "large" : "middle"}
              block
            />
          </Col>
          {recordType === "По ФИО" ? (
            <DoctorSelect
              selectedDoctorId={selectedDoctor?.doctor_id}
              onChange={handleChangeDoctor}
              doctors={doctors}
              isLoading={doctorsLoading}
            />
          ) : (
            <SpecialitySelect
              isLoading={specialitiesLoading}
              specialities={specialities}
              onChange={handleChangeSpeciality}
              selectedSpecialityId={selectedSpeciality?.doc_speciality_id}
            />
          )}
        </Row>
        <Row justify="space-between" className={styles.footer}>
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
