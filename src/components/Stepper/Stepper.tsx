import React, { FC } from "react";
import { Steps, Grid } from "antd";
import cn from "classnames";

import styles from "./Stepper.module.css";
import { StepperProps } from "./Stepper.props";

const { Step } = Steps;
const { useBreakpoint } = Grid;

export const Stepper: FC<StepperProps> = ({
  steps,
  current,
  status,
  className,
  ...props
}) => {
  const { lg } = useBreakpoint();

  return (
    <Steps
      current={current}
      status={status}
      className={cn(styles.stepper, className)}
      size="small"
      progressDot={!lg}
      {...props}
    >
      {steps.map((step) => (
        <Step
          key={step.title}
          title={step.title}
          description={step.description}
        />
      ))}
    </Steps>
  );
};
