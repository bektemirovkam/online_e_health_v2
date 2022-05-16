export interface ISelectHospital {
  value: string;
  children: string;
  key: string;
}

export interface FirstFormProps {
  submitForm: () => void;
  IIN: string;
  setIIN: (IIN: string) => void;
  hospital: ISelectHospital;
  setHospital: (hospital: ISelectHospital) => void;
  captchaResp: string | null;
  setCaptchaResp: (captcha: string | null) => void;
  clearError: () => void;
}
