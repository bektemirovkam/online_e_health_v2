import { DetailedHTMLProps, HTMLAttributes,  } from "react";
import { UserDataType } from "../../models/User";

export interface UserDataBoxProps extends DetailedHTMLProps<
HTMLAttributes<HTMLDivElement>,
HTMLDivElement
>  {
  appointmentUserData: UserDataType;
}
