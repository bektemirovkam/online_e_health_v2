import { Descriptions } from "antd";
import React, { FC } from "react";
import { UserDataBoxProps } from "./UserDataBox.props";

const UserDataBox: FC<UserDataBoxProps> = ({
  appointmentUserData,
  ...props
}) => {
  return (
    <Descriptions {...props}>
      <Descriptions.Item label="ФИО">
        {appointmentUserData.FIO}
      </Descriptions.Item>
      <Descriptions.Item label="Участковый врач">
        {appointmentUserData.Doctor}
      </Descriptions.Item>
      <Descriptions.Item label="Участок">
        {appointmentUserData.Territory}
      </Descriptions.Item>
      <Descriptions.Item label="Статус ОСМС">
        {appointmentUserData.StatusOSMS}
      </Descriptions.Item>
      <Descriptions.Item label="Поликлиника">
        {appointmentUserData.Attachment}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserDataBox;
