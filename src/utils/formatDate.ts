import moment, { Moment } from "moment";
import "moment/locale/ru";
moment.locale("ru");

export const defaultFormatDate = (date: Date) => {
  return moment(date).format("L");
};

export const isAfterDate = (date1: Moment | Date, date2: Date) => {
  return moment(date1).isAfter(date2);
};

export const formatDataDistance = (data: Moment) => {
  return moment(data).fromNow();
};

export const createNewDate = (date: string, time: string) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return moment(`${year}-${month}-${day}T${time}`);
};

export const formatServerDate = (value: string) => {
  // нужно в тех местах где время и дата выводятся отдельно
  return `${value.substring(6, 8)}.${value.substring(4, 6)}.${value.substring(
    0,
    4
  )} ${value.substring(8, 10) ? value.substring(8, 10) : ""}${
    value.substring(10, 12) ? ":" + value.substring(10, 12) : ""
  }`;
};

export const formatDateFromString = (
  value: string | number,
  format = "YYYY-MM-DD"
) => {
  const date = moment(value).format(format);
  return date;
};

export const getNowDate = (format = "YYYY-MM-DD") => {
  return moment().format(format);
};
