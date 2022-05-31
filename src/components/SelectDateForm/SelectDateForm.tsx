import React, { FC } from "react";
import { useSelector } from "react-redux";

import { SelectDateFormProps } from "./SelectDateForm.props";
import styles from "./SelectDateForm.module.css";
import { getAvailableDatesState } from "../../store/selectors/appointment";
import { getNGScheduleLoadingState } from "./../../store/selectors/appointment";
import { Preloader } from "../Preloader/Preloader";
import { Button, Col, Row, Grid } from "antd";

const { useBreakpoint } = Grid;

export const SelectDateForm: FC<SelectDateFormProps> = ({
  goBack,
  submitForm,
}) => {
  const availableDates = useSelector(getAvailableDatesState);
  const availableDatesLoading = useSelector(getNGScheduleLoadingState);

  const { sm } = useBreakpoint();

  if (availableDatesLoading) {
    return <Preloader />;
  }

  return (
    <Col className="form">
      <Row justify="center">'Content'</Row>

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
