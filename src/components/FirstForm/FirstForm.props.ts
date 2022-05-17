export interface FirstFormProps {
  submitForm: () => void;
  IIN: string;
  setIIN: (IIN: string) => void;
  hospitalId: string;
  setHospitalId: (hospitalId: string) => void;
  captchaResp: string | null;
  setCaptchaResp: (captcha: string | null) => void;
  clearError: () => void;
}
