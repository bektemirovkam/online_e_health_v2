import { GetDoctorsItemType } from "../../models/Hospital";

export interface DoctorSelectProps {
  isLoading: boolean;
  doctors: GetDoctorsItemType[];
  selectedDoctorId?: string;
  onChange: (id: string) => void;
}
