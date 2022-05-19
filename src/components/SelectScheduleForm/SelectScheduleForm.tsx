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
import { Preloader } from "../Preloader/Preloader";

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
  const [recordType, setRecordType] = useState<RecordMethodType>(
    "Выбрать врача по ФИО"
  );

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
    if (recordType === "Выбрать врача по ФИО") {
      // dispatch(getDoctors(hospitalId, null));
      // dispatch(getDoctors("867", null));
    } else if (recordType === "Выбрать по специализации") {
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

  //TODO: Segment component adaptive

  return (
    <Col className="form">
      <>
        <Row justify="center">
          <Text className={styles.recordTypeTitle}>Способ выбора врача</Text>
        </Row>
        <Row justify="center" className={styles.recorType}>
          <Segmented
            options={["Выбрать врача по ФИО", "Выбрать по специализации"]}
            onChange={handleChangeRecordMethod}
            value={recordType}
            disabled={doctorsLoading || specialitiesLoading}
            size={sm ? "large" : "middle"}
          />
        </Row>
      </>
      {recordType === "Выбрать врача по ФИО" ? (
        <Row justify="center">
          <Col sm={20} className="input_wrapper">
            <Row justify="center">
              <Text className={styles.recordTypeTitle}>Выберите врача</Text>
            </Row>
            {doctorsLoading ? (
              <Preloader />
            ) : (
              <Select
                size="large"
                className="select"
                onChange={handleChangeDoctor}
                value={selectedDoctor?.doctor_id}
                placeholder="Выберите врача"
              >
                {doctors.map((doc) => (
                  <Option key={doc.doctor_id} value={doc.doctor_id}>
                    {doc.full_name}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
        </Row>
      ) : (
        <Row justify="center">
          <Col sm={20} className="input_wrapper">
            <Row justify="center">
              <Text className={styles.recordTypeTitle}>
                Выберите специализацию
              </Text>
            </Row>
            {specialities &&
              (specialitiesLoading ? (
                <Preloader />
              ) : (
                <Select
                  size="large"
                  className="select"
                  onChange={handleChangeDoctor}
                  value={selectedSpeciality?.doc_speciality_id}
                  placeholder="Выберите специализацию"
                >
                  {specialities.map((spec) => (
                    <Option
                      key={spec.doc_speciality_id}
                      value={spec.doc_speciality_id}
                    >
                      {spec.doc_speciality}
                    </Option>
                  ))}
                </Select>
              ))}
          </Col>
        </Row>
      )}
      <Row justify="space-between" className={styles.footer}>
        <Button size="large" type="default" onClick={goBack}>
          Назад
        </Button>
        <Button type="primary" size="large" onClick={submitForm}>
          Продолжить
        </Button>
      </Row>
    </Col>
  );
};
