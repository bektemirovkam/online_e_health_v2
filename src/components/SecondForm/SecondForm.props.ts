import { ISelectHospital } from "../FirstForm/FirstForm.props";

export interface SecondFormProps {
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  hospital: ISelectHospital;
}
