import { StepsProps } from "antd";

export interface StepperProps extends StepsProps {
  steps: IStep[];
  current: number;
  status: "wait" | "process" | "finish" | "error";
}

export interface IStep {
  title: string;
  description?: string;
}
