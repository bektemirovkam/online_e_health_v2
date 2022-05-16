import React, { FC, useEffect, useState } from "react";
import { Button, Col, Modal, Row, Typography, Segmented } from "antd";

import { SecondFormProps } from "./SecondForm.props";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SecondForm.module.css";
import {
  getAppointmentUserDataLoadingState,
  getAppointmentUserDataState,
  getAppointmentErrorMessageState,
} from "./../../store/selectors/appointment";
import { Preloader } from "../Preloader/Preloader";
import UserDataBox from "../UserDataBox/UserDataBox";
import { appointmentActions } from "../../store/actions/appointment";
import { SegmentedValue } from "antd/lib/segmented";

const { Text } = Typography;

export const SecondForm: FC<SecondFormProps> = ({
  goBack,
  submitForm,
  clearError,
  hospital,
}) => {
  const [recordType, setRecordType] = useState<SegmentedValue>(
    "Запись к участковому врачу"
  );

  const appointmentUserData = useSelector(getAppointmentUserDataState);
  const appointmentUserDataLoading = useSelector(
    getAppointmentUserDataLoadingState
  );
  const appointmentError = useSelector(getAppointmentErrorMessageState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (appointmentError) {
      Modal.error({
        title: "Ошибка",
        content: appointmentError,
        onOk: clearError,
      });
    }
  }, [appointmentError, clearError]);

  useEffect(() => {
    if (appointmentUserData && hospital.value === "0") {
      if (appointmentUserData.ErrorCode !== 0) {
        dispatch(
          appointmentActions.setAppointmentError(appointmentUserData.ErrorDesc)
        );
      } else if (appointmentUserData.RegAvailable !== 1) {
        dispatch(
          appointmentActions.setAppointmentError(
            "Запись в мед.организацию прикрепления пациента недоступна"
          )
        );
      }
    }
  }, [appointmentUserData, dispatch, hospital.value]);

  const handleChangeRecordType = (type: SegmentedValue) => {
    setRecordType(type);
  };

  if (appointmentUserDataLoading) {
    return <Preloader />;
  }

  return (
    <Col className="form">
      <Row justify="center">
        {appointmentUserData && (
          <UserDataBox
            appointmentUserData={appointmentUserData}
            title={<Text className={styles.title}>Информация о пациенте</Text>}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            bordered
          />
        )}
      </Row>
      {hospital.value === "0" && (
        <>
          <Row justify="center">
            <Text className={styles.recordTypeTitle}>
              Куда хотите записаться?
            </Text>
          </Row>
          <Row justify="center" className={styles.recorType}>
            <Segmented
              options={[
                "Запись к участковому врачу",
                "Запись к узким специалистам",
              ]}
              onChange={handleChangeRecordType}
              value={recordType}
              size="large"
            />
          </Row>
        </>
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
