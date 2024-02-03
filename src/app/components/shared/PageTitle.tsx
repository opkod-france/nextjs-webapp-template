import { Divider, Typography } from '@mui/material';
import * as React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <>
      <Typography variant='h2' gutterBottom display='inline'>
        {children}
      </Typography>
      <Divider sx={{ my: 6 }} />
    </>
  );
};

export default PageTitle;
