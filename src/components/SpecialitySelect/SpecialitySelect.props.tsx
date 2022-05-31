import { SizeType } from "antd/lib/config-provider/SizeContext";
import { SpecialitiesType } from "../../models/Hospital";

export interface SpecialitySelectProps {
  isLoading: boolean;
  specialities: SpecialitiesType[] | null;
  selectedSpecialityId?: string;
  onChange: (id: string) => void;
  size?: SizeType;
}
