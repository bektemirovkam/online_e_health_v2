import { SpinSize } from "antd/lib/spin";

export interface PreloaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size?: SpinSize;
}
