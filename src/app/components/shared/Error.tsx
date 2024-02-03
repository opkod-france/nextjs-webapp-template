import { Alert } from "@mui/material";
import { ErrorInfo } from "react";

type ErrorProps = {
  error: Error;
  errorInfo: ErrorInfo | null;
};

const Error = ({ error, errorInfo }: ErrorProps) => {
  return (
    <Alert variant="outlined" severity="error">
      <h3>Une erreur s'est produite</h3>
      {error.toString()}
      <p>{errorInfo?.componentStack}</p>
    </Alert>
  );
};

export default Error;
