export type RecordAttachmentType =
  | "Запись к участковому врачу"
  | "Запись к узким специалистам";

export interface SecondFormProps {
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  hospitalId: string;
}
