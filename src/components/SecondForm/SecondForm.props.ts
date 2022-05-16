import { ISelectHospital } from "../FirstForm/FirstForm.props";

export type RecordAttachmentType =
  | "Запись к участковому врачу"
  | "Запись к узким специалистам";

export interface SecondFormProps {
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  hospital: ISelectHospital;
}
