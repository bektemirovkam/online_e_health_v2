import { Button, Col, Modal, Row, Segmented, Typography, Grid } from "antd";
import React, { FC, useEffect } from "react";
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
  recordType,
  setRecordType,
}) => {
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
    if (hospitalId) {
      if (recordType === "По ФИО" && !doctors) {
        dispatch(getDoctors(hospitalId));
        // dispatch(getDoctors("867"));
      } else if (recordType === "По специализации" && !specialities) {
        dispatch(getSpecialities(hospitalId));
        // dispatch(getSpecialities("867"));
      }
    }
  }, [dispatch, recordType, hospitalId, doctors, specialities]);

  const handleChangeRecordMethod = (value: SegmentedValue) => {
    setRecordType(value as RecordMethodType);
  };

  const handleChangeDoctor = (doctorId: string) => {
    const selectedDoctor = doctors?.find((doc) => doc.doctor_id === doctorId);
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
    }
  };

  const handleChangeSpeciality = (specialityId: string) => {
    const selectedSpeciality = specialities?.find(
      (spec) => spec.doc_speciality_id === specialityId
    );
    if (selectedSpeciality) {
      setSpecialities(selectedSpeciality);
    }
  };

  if (appointmentError) {
    return (
      <Modal
        title="Ошибка"
        onCancel={clearError}
        onOk={clearError}
        cancelText="Закрыть"
        visible
        centered
      >
        <p>{appointmentError}</p>
      </Modal>
    );
  }

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
              size={sm ? "large" : "middle"}
            />
          ) : (
            <SpecialitySelect
              specialities={specialities}
              onChange={handleChangeSpeciality}
              selectedSpecialityId={selectedSpeciality?.doc_speciality_id}
              isLoading={specialitiesLoading}
              size={sm ? "large" : "middle"}
            />
          )}
        </Row>
        <Row justify="space-between" className={styles.footer}>
          <Button
            type="default"
            size={sm ? "large" : "middle"}
            onClick={goBack}
          >
            Назад
          </Button>
          <Button
            type="primary"
            size={sm ? "large" : "middle"}
            onClick={submitForm}
            disabled={
              recordType === "По ФИО" ? !selectedDoctor : !selectedSpeciality
            }
          >
            Продолжить
          </Button>
        </Row>
      </Col>
    </>
  );
};
