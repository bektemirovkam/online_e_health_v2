import React, { FC } from "react";
import { Col, Select, Typography } from "antd";

import { DoctorSelectProps } from "./DoctorSelect.props";
import { Preloader } from "../Preloader/Preloader";

const { Text } = Typography;
const { Option } = Select;

export const DoctorSelect: FC<DoctorSelectProps> = ({
  isLoading,
  doctors,
  selectedDoctorId,
  onChange,
  size = "large",
}) => {
  return (
    <Col className="input_wrapper">
      <Text className="subtitle">Выберите врача</Text>
      {isLoading ? (
        <Preloader />
      ) : (
        <Select
          size={size}
          className="select"
          onChange={onChange}
          value={selectedDoctorId}
          placeholder="Выберите врача"
        >
          {doctors &&
            doctors.map((doc) => (
              <Option key={doc.doctor_id} value={doc.doctor_id}>
                {doc.full_name}
              </Option>
            ))}
        </Select>
      )}
    </Col>
  );
};
