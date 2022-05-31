import { RecordMethodType } from "../../models/Appointment";
import { GetDoctorsItemType, SpecialitiesType } from "../../models/Hospital";

export interface SelectScheduleFormProps {
  hospitalId: string | null;
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  selectedDoctor: GetDoctorsItemType | null;
  setDoctor: (doctor: GetDoctorsItemType | null) => void;
  selectedSpeciality: SpecialitiesType | null;
  setSpecialities: (speciality: SpecialitiesType | null) => void;
  recordType: RecordMethodType;
  setRecordType: (recordType: RecordMethodType) => void;
}
