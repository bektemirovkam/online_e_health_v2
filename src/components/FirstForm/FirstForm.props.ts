import { IOrgInfoByAppointment } from "./../../models/Appointment";

export interface FirstFormProps {
  submitForm: () => void;
  IIN: string;
  setIIN: (IIN: string) => void;
  hospital: string;
  setHospital: (hospital: string) => void;
  captchaResp: string | null;
  setCaptchaResp: (captcha: string | null) => void;
  orgList?: IOrgInfoByAppointment[];
}
