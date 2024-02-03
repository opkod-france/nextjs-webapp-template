import { Backdrop, CircularProgress, Typography } from '@mui/material';

interface PageLoaderProps {
  text?: string;
}

const PageLoader = ({ text = 'Chargement en cours...' }: PageLoaderProps) => {
  return (
    <Backdrop open>
      <CircularProgress color='inherit' />
      <Typography component='div' variant='h6'>{text}</Typography>
    </Backdrop>
  );
};

export default PageLoader;
