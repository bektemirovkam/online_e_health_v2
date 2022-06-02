import {
  AvailableDateType,
  AvailableScheduleItem,
} from "../../models/Hospital";

export interface SelectDateFormProps {
  goBack: () => void;
  submitForm: () => void;
  setDate: (date: string) => void;
  selectedDate: string | null;
  setTime: (time: AvailableDateType | null) => void;
  selectedTime: AvailableDateType | null;
  selectedSchedule: AvailableScheduleItem | null;
  setSchedule: (schedule: AvailableScheduleItem | null) => void;
  clearError: () => void;
}
