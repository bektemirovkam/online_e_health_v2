import { DescriptionsProps } from "antd";
import { UserDataType } from "../../models/User";

export interface UserDataBoxProps extends DescriptionsProps {
  appointmentUserData: UserDataType;
}
