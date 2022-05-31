import { SizeType } from "antd/lib/config-provider/SizeContext";
import { GetDoctorsItemType } from "../../models/Hospital";

export interface DoctorSelectProps {
  isLoading: boolean;
  doctors: GetDoctorsItemType[] | null;
  selectedDoctorId?: string;
  onChange: (id: string) => void;
  size?: SizeType;
}
