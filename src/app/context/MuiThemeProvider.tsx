"use client";




import createTheme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme("DEFAULT");
const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
