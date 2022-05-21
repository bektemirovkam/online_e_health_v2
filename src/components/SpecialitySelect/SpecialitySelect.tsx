import React, { FC } from "react";
import { Col, Select, Typography } from "antd";

import { SpecialitySelectProps } from "./SpecialitySelect.props";
import { Preloader } from "../Preloader/Preloader";

const { Text } = Typography;
const { Option } = Select;

export const SpecialitySelect: FC<SpecialitySelectProps> = ({
  isLoading,
  onChange,
  selectedSpecialityId,
  specialities,
}) => {
  return (
    <Col className="input_wrapper">
      <Text className="subtitle">Выберите специализацию</Text>
      {isLoading ? (
        <Preloader />
      ) : (
        <Select
          size="large"
          className="select"
          onChange={onChange}
          value={selectedSpecialityId}
          placeholder="Выберите специализацию"
        >
          {specialities?.map((spec) => (
            <Option key={spec.doc_speciality_id} value={spec.doc_speciality_id}>
              {spec.doc_speciality}
            </Option>
          ))}
        </Select>
      )}
    </Col>
  );
};
