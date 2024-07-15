// import { FC } from "react";
import "./Button.module.css";

import { ButtonProps } from "./Button.propx";
import cn from "classnames";

// 4example

// export const ButtonAlt: FC<ButtonProps> = ({
//   className,
//   children,
//   ...props
// }) => {
//   return (
//     <>
//       <button className={cn("button accent", className)} {...props}>
//         {children}
//       </button>
//     </>
//   );
// };

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <>
      <button className={cn("button accent", className)} {...props}>
        {children}
      </button>
    </>
  );
};
