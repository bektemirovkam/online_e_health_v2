import { RecordAttachmentType } from "../../models/Appointment";

export interface SecondFormProps {
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  hospitalId: string;
  recordType: RecordAttachmentType;
  setRecordType: React.Dispatch<React.SetStateAction<RecordAttachmentType>>;
}
