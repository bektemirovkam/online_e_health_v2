import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import {
  Button,
  Col,
  Row,
  Grid,
  Calendar,
  Select,
  Typography,
  Modal,
} from "antd";
import { Moment } from "moment";
import { HeaderRender } from "antd/lib/calendar/generateCalendar";
import moment from "moment";
import "moment/locale/ru";

import styles from "./SelectDateForm.module.css";
import { SelectDateFormProps } from "./SelectDateForm.props";
import {
  getAppointmentErrorMessageState,
  getAvailableDatesState,
} from "../../store/selectors/appointment";
import { getNGScheduleLoadingState } from "./../../store/selectors/appointment";
import { Preloader } from "../Preloader/Preloader";
import {
  formatDateFromString,
  getMomentFromAvailableDate,
} from "../../utils/formatDate";
import { locale } from "./locale";

moment.locale("ru");

const { useBreakpoint } = Grid;
const { Option } = Select;
const { Text } = Typography;

const renderCalendar: HeaderRender<Moment> = ({ value, onChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.months(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(<Option key={`${index}`}>{months[index]}</Option>);
  }
  const month = value.month();
  return (
    <Col>
      <Row justify="end">
        <Select
          size={"middle"}
          dropdownMatchSelectWidth={false}
          value={String(month)}
          onChange={(selectedMonth) => {
            const newValue = value.clone();
            newValue.month(parseInt(selectedMonth, 10));
            onChange(newValue);
          }}
          className={styles.selectDate}
        >
          {monthOptions}
        </Select>
      </Row>
      <Row justify="center">
        <Text className="subtitle">Выберите дату</Text>
      </Row>
    </Col>
  );
};

export const SelectDateForm: FC<SelectDateFormProps> = ({
  goBack,
  submitForm,
  setDate,
  selectedDate,
  setTime,
  selectedTime,
  selectedSchedule,
  setSchedule,
  clearError,
}) => {
  const [range, setRange] = useState<[Moment, Moment] | undefined>();
  const [showScheduleSelect, setShowScheduleSelect] = useState(false);

  const availableDates = useSelector(getAvailableDatesState);
  const availableDatesLoading = useSelector(getNGScheduleLoadingState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);

  const { sm } = useBreakpoint();

  useEffect(() => {
    /*  Установка диапозона дат для календаря  */
    if (availableDates) {
      const keys = Object.keys(availableDates);
      setRange([
        getMomentFromAvailableDate(keys[0]),
        getMomentFromAvailableDate(keys[keys.length - 1]),
      ]);
      setDate(keys[0]);
    }
  }, [availableDates, setDate]);

  const handleDateChange = (moment: Moment) => {
    setTime(null);
    const dateStr = moment.format("YYYY-MM-DD");
    setDate(dateStr);
  };

  useEffect(() => {
    if (availableDates && selectedDate) {
      const dates = availableDates[selectedDate];
      if (dates) {
        setTime(dates[0]);
      }
    }
  }, [availableDates, selectedDate, setTime]);

  useEffect(() => {
    const scheduleData = selectedTime?.schedules_data;
    if (scheduleData) {
      setSchedule(scheduleData[0]);
      if (scheduleData.length > 1) {
        setShowScheduleSelect(true);
      } else {
        setShowScheduleSelect(false);
      }
    }
  }, [selectedTime, setSchedule]);

  const handleTimeChange = (time: string) => {
    if (availableDates && selectedDate) {
      const selectedAvailableDate = availableDates[selectedDate].find(
        (date) => date.date_begin === time
      );
      if (selectedAvailableDate) {
        setTime(selectedAvailableDate);
      }
    }
  };

  const handleScheduleChange = (scheduleId: string) => {
    const schedule = selectedTime?.schedules_data.find(
      (schedule) => schedule.schedule_id === scheduleId
    );
    if (schedule) {
      setSchedule(schedule);
    }
  };

  if (availableDatesLoading) {
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
      <Row justify="center">
        {availableDates && (
          <Calendar
            fullscreen={false}
            defaultValue={range ? range[0] : undefined}
            validRange={range}
            headerRender={renderCalendar}
            onChange={handleDateChange}
            value={
              selectedDate
                ? getMomentFromAvailableDate(selectedDate)
                : undefined
            }
            locale={locale}
          />
        )}
      </Row>
      <Row justify="center">
        <Col className="input_wrapper">
          {availableDates && selectedDate && availableDates[selectedDate] && (
            <>
              <Row justify="center">
                <Text className="subtitle">Выберите время</Text>
              </Row>
              <Row justify="center">
                <Select
                  onChange={handleTimeChange}
                  className={styles.selectDate}
                  value={selectedTime?.date_begin}
                  size={sm ? "large" : "middle"}
                >
                  {availableDates[selectedDate].map((item) => {
                    return (
                      <Option key={item.date_begin}>
                        {formatDateFromString(item.date_begin, "HH:mm")}
                      </Option>
                    );
                  })}
                </Select>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <Row
        justify="center"
        className={cn(styles.schedule, {
          [styles.visible]: showScheduleSelect && selectedTime?.schedules_data,
        })}
      >
        <Col className="input_wrapper">
          <Row justify="center">
            <Text className="subtitle">Выберите расписание</Text>
          </Row>
          <Row justify="center">
            <Select
              onChange={handleScheduleChange}
              className={styles.selectSchedule}
              value={selectedSchedule?.schedule_name}
              size={sm ? "large" : "middle"}
            >
              {selectedTime?.schedules_data.map((item) => {
                return (
                  <Option key={item.schedule_id}>{item.schedule_name}</Option>
                );
              })}
            </Select>
          </Row>
        </Col>
      </Row>

      <Row
        justify="space-between"
        className={cn(styles.footer, {
          [styles.margin]: showScheduleSelect && selectedTime?.schedules_data,
        })}
      >
        <Button type="default" size={sm ? "large" : "middle"} onClick={goBack}>
          Назад
        </Button>
        <Button
          type="primary"
          size={sm ? "large" : "middle"}
          onClick={submitForm}
          disabled={!selectedSchedule}
        >
          Продолжить
        </Button>
      </Row>
    </Col>
  );
};
