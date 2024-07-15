// import { FC } from "react";
import styles from "./Button.module.css";

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

export const Button = ({
  children,
  className,
  size = "small",
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        className={cn(styles["button"], styles["accent"], className, {
          [styles["small"]]: size === "small",
          [styles["big"]]: size === "big",
        })}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
