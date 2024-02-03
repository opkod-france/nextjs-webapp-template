import { Alert, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useFormikContext, FormikErrors } from 'formik';
import { isString } from 'lodash';
import React from 'react';

interface ErrorObject {
  error: string;
  [key: string]: ErrorObject | string;
}

const renderErrorList = (errors: FormikErrors<any>): React.ReactNodeArray => {
  return Object.entries(errors).map(([field, error]) => {
    if (isString(error)) {
      return (
        <ListItem key={field}>
          <ListItemText primary={error} />
        </ListItem>
      );
    } else {
      return (
        <React.Fragment key={field}>
          <ListItem>
            <ListItemText primary={(error as ErrorObject).error} />
          </ListItem>
          {renderErrorList(error as ErrorObject)}
        </React.Fragment>
      );
    }
  });
};

const FormErrorsSummary = <T extends object>(): React.ReactElement | null => {
  const { errors } = useFormikContext<T>();
  const fields = Object.keys(errors);
  if (fields.length === 0) {
    return null;
  }

  return (
    <Alert severity='error'>
      <Typography variant='h5'>
        Veuillez corriger les erreurs ci-dessous avant de soumettre à nouveau le
        formulaire.
      </Typography>
      <List>{renderErrorList(errors)}</List>
    </Alert>
  );
};

export default FormErrorsSummary;
