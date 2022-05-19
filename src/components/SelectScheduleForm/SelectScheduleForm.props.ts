import { GetDoctorsItemType, SpecialitiesType } from "../../models/Hospital";

export interface SelectScheduleFormProps {
  hospitalId: string | null;
  submitForm: () => void;
  goBack: () => void;
  clearError: () => void;
  selectedDoctor: GetDoctorsItemType | null;
  setDoctor: (doctor: GetDoctorsItemType) => void;
  selectedSpeciality: SpecialitiesType | null;
  setSpecialities: (doctor: SpecialitiesType) => void;
}
