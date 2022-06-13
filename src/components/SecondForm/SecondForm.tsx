import React, { FC, useEffect } from "react";
import { Button, Col, Modal, Row, Typography, Segmented, Grid } from "antd";

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
import { RecordAttachmentType } from "../../models/Appointment";

const { Text } = Typography;
const { useBreakpoint } = Grid;

export const SecondForm: FC<SecondFormProps> = ({
  goBack,
  submitForm,
  clearError,
  hospitalId,
  attachmentRecordType,
  setAttachmentRecordType,
}) => {
  const appointmentUserData = useSelector(getAppointmentUserDataState);
  const appointmentUserDataLoading = useSelector(
    getAppointmentUserDataLoadingState
  );
  const appointmentError = useSelector(getAppointmentErrorMessageState);

  const dispatch = useDispatch();
  const { sm } = useBreakpoint();

  useEffect(() => {
    if (appointmentUserData && hospitalId === "0") {
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
  }, [appointmentUserData, dispatch, hospitalId]);

  useEffect(() => {
    if (
      hospitalId === "0" &&
      attachmentRecordType === "К узким специалистам" &&
      !appointmentUserData?.RegToProfileSpecs
    ) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Запись к узким специалистам недоступна"
        )
      );
    }
  }, [attachmentRecordType, appointmentUserData, dispatch, hospitalId]);

  useEffect(() => {
    const error = appointmentUserData?.OrgErrors?.find(
      (item) => item.OrgID === hospitalId
    );

    if (error) {
      dispatch(appointmentActions.setAppointmentError(error.ErrorText));
    }
  }, [appointmentUserData?.OrgErrors, dispatch, hospitalId]);

  const handleChangeRecordType = (type: SegmentedValue) => {
    setAttachmentRecordType(type as RecordAttachmentType);
  };

  if (appointmentUserDataLoading) {
    return <Preloader />;
  }

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
    <Col className="form">
      {appointmentUserData && (
        <UserDataBox appointmentUserData={appointmentUserData} />
      )}
      {hospitalId === "0" && (
        <>
          <Row justify="center">
            <Text className={styles.recordTypeTitle}>
              Куда хотите записаться?
            </Text>
          </Row>
          <Row justify="center" className={styles.recorType}>
            <Segmented
              options={["К участковому врачу", "К узким специалистам"]}
              onChange={handleChangeRecordType}
              value={attachmentRecordType}
              size={sm ? "large" : "middle"}
            />
          </Row>
        </>
      )}
      <Row justify="space-between" className={styles.footer}>
        <Button type="default" size={sm ? "large" : "middle"} onClick={goBack}>
          Назад
        </Button>
        <Button
          type="primary"
          size={sm ? "large" : "middle"}
          onClick={submitForm}
        >
          Продолжить
        </Button>
      </Row>
    </Col>
  );
};
