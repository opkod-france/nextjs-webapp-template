// a component taht displas the version of the app
import React from "react";
import { Typography } from "@mui/material";
import app from "@/package.json";

const Version = () => {
  const version = `v${app.version}`;

  return (
    <Typography>
      {version}
    </Typography>
  );
};

export default Version;
