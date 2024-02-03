"use client";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DayJsLocalizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
    {children}
  </LocalizationProvider>
);

export default DayJsLocalizationProvider;
