import React, { FC } from "react";
import { useSelector } from "react-redux";

import { SelectDateFormProps } from "./SelectDateForm.props";
import styles from "./SelectDateForm.module.css";
import { getAvailableDatesState } from "../../store/selectors/appointment";

export const SelectDateForm: FC<SelectDateFormProps> = () => {
  const availableDates = useSelector(getAvailableDatesState);

  console.log("availableDates ---> ", availableDates);

  return <div className={styles.wrapper}>SelectDateForm</div>;
};
