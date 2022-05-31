import { RecordAttachmentType } from "../../models/Appointment";

export interface SecondFormProps {
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  hospitalId: string;
  attachmentRecordType: RecordAttachmentType;
  setAttachmentRecordType: React.Dispatch<
    React.SetStateAction<RecordAttachmentType>
  >;
}
