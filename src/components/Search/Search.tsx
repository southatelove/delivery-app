import styles from "./Search.module.css";
import cn from "classnames";
import { forwardRef } from "react";
import { SearchProps } from "./Search.props";

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { className, ...props },
  ref
) {
  return (
    <>
      <div className={styles["input-wrapper"]}>
        <input
          ref={ref}
          {...props}
          className={cn(styles["input"], className)}
        />
        <img className={styles["icon"]} src="/search.svg" alt="Иконка поиска" />
      </div>
    </>
  );
});
