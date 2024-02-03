import { forgotPassword } from "@/app/shared/services/auth";
import styled from "@emotion/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert as MuiAlert,
  TextField as MuiTextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState<string>("");

  return success ? (
    <>
      <Typography variant="h3" gutterBottom>
        Rendez-vous dans votre boîte e-mail
      </Typography>
      <Typography variant="body1">
        Nous vous avons envoyé un lien pour choisir un nouveau mot de passe.
      </Typography>
      <Link href="/">Revenir à la page d&apos;accueil</Link>
    </>
  ) : (
    <>
      <Formik
        initialValues={{
          email: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email obligatoire"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          forgotPassword(values.email)
            .then(() => {
              setSuccess(true);
            })
            .catch((error) => {
              setErrorState(error.message as string);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ errors, handleSubmit, isSubmitting, touched, getFieldProps }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              {...getFieldProps("email")}
              label="Adresse email"
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              my={3}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              Réinitialiser le mot de passe
            </LoadingButton>
          </form>
        )}
      </Formik>{" "}
      <Snackbar
        open={!!errorState}
        autoHideDuration={6000}
        onClose={() => setErrorState("")}
      >
        <div>
          {!!errorState && (
            <Alert severity="error" elevation={6} variant="filled">
              {errorState}
            </Alert>
          )}
        </div>
      </Snackbar>
    </>
  );
}

export default ForgotPassword;
