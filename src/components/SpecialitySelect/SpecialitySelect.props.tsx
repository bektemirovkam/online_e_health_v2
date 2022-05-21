import { SpecialitiesType } from "../../models/Hospital";

export interface SpecialitySelectProps {
  isLoading: boolean;
  specialities: SpecialitiesType[] | null;
  selectedSpecialityId?: string;
  onChange: (id: string) => void;
}
