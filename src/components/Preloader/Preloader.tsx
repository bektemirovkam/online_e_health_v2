import React, { FC } from "react";
import { Spin } from "antd";
import cn from "classnames";

import styles from "./Preloader.module.css";
import { PreloaderProps } from "./Preloader.props";

export const Preloader: FC<PreloaderProps> = ({
  className,
  size = "large",
}) => {
  return (
    <div className={cn(styles.preloader, className)}>
      <Spin size={size} />
    </div>
  );
};
