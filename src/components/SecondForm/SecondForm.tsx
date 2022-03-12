import React, { FC, useState } from "react";
import { Button, Col, Row, Select, Typography } from "antd";

import { SecondFormProps } from "./SecondForm.props";

const { Title, Text } = Typography;
const { Option } = Select;

export const SecondForm: FC<SecondFormProps> = ({ goBack, submitForm }) => {
  const [time, setTime] = useState("14:00");
  const [date, setDate] = useState("20200112");

  const handleChangeTime = (time: string) => {
    setTime(time);
  };

  const handleChangeDate = (date: string) => {
    setDate(date);
  };

  return (
    <Col xl={14} lg={16} md={20} sm={24} className="form">
      <Row justify="center">
        <Title className="title">Запись на приём online</Title>
      </Row>
      <Row justify="center">
        <Col md={14} sm={20} className="input_wrapper">
          <Text className="subtitle">Выберите дату</Text>
          <Select
            defaultValue={date}
            size="large"
            className="select"
            onChange={handleChangeDate}
          >
            <Option value="20200112">12 января 2022</Option>
            <Option value="20200113">13 января 2022</Option>
            <Option value="20200114">14 января 2022</Option>
            <Option value="20200115">15 января 2022</Option>
          </Select>
        </Col>
        <Col md={14} sm={20} className="input_wrapper">
          <Text className="subtitle">Выберите время</Text>
          <Select
            defaultValue={time}
            size="large"
            className="select"
            onChange={handleChangeTime}
          >
            <Option value="14:00">14:00</Option>
            <Option value="14:20">14:20</Option>
            <Option value="14:40">14:40</Option>
            <Option value="15:00">15:00</Option>
          </Select>
        </Col>
      </Row>

      <Row justify="space-between">
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
