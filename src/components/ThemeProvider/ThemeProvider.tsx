import React from "react";
import "../../styles/index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useSelector((s: RootState) => s.theme.theme);

  return <div className={`app ${theme}`}>{children}</div>;
};
