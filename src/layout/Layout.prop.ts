import { ColProps } from "antd";
import { ReactNode } from "react";

export interface LayoutProps extends ColProps {
  children: ReactNode;
}
