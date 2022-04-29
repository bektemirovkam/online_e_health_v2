import { RowProps } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

export interface HeaderProps extends RowProps {}

export interface HeaderLinkProps extends LinkProps {
  to: string;
  title: string;
}
