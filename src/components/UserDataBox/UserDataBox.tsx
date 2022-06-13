import { Typography } from "antd";
import React, { FC } from "react";
import { UserDataType } from "../../models/User";

import styles from "./UserDataBox.module.css";
import { UserDataBoxProps } from "./UserDataBox.props";

const { Text } = Typography;

const items = [
  {
    title: "ФИО",
    key: "FIO" as keyof UserDataType,
  },
  {
    title: "Участковый врач",
    key: "Doctor" as keyof UserDataType,
  },
  {
    title: "Участок",
    key: "Territory" as keyof UserDataType,
  },
  {
    title: "Статус ОСМС",
    key: "StatusOSMS" as keyof UserDataType,
  },
  {
    title: "Поликлиника",
    key: "Attachment" as keyof UserDataType,
  },
];

const UserDataBox: FC<UserDataBoxProps> = ({
  appointmentUserData,
  ...props
}) => {
  return (
    <>
      <Text className={styles.title}>Информация о пациенте</Text>
      <div className={styles.info} {...props}>
        {items.map((item) => (
          <div className={styles.infoItem} key={item.key}>
            <div className={styles.infoLabel}>{item.title}</div>
            <div className={styles.infoValue}>
              {appointmentUserData[item.key]}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDataBox;
