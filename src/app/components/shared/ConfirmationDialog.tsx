import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import * as React from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  confirmButtonLabel: string;
  description: string | React.ReactNode;
  cancelButtonLabel?: string;
  loading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  open,
  title,
  onCancel,
  onConfirm,
  cancelButtonLabel,
  loading = false,
  description,
  confirmButtonLabel,
}: ConfirmationDialogProps) => {
  console.log('ConfirmationDialog', open)
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button variant='text' color='secondary' autoFocus onClick={onCancel}>
          {cancelButtonLabel ? cancelButtonLabel : 'Annuler'}
        </Button>
        {loading ? (
          <LoadingButton variant='contained' color='error'>
            {confirmButtonLabel}
          </LoadingButton>
        ) : (
          <Button variant='contained' color='error' onClick={onConfirm}>
            {confirmButtonLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
