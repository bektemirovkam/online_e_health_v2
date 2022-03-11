import { IStep } from "../Stepper/Stepper.props";

export interface SecondFormProps {
  submitForm: () => void;
  goBack: () => void;
  steps: IStep[];
}
