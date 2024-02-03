"use client";
import { resetPassword } from "@/app/shared/services/auth";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  IconButton,
  Alert as MuiAlert,
  TextField as MuiTextField,
  Snackbar,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Utilisation de useSearchParams
  const code = searchParams.get("code");

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorState, setErrorState] = useState<string>("");
  return success ? (
    <>
      <Typography variant="h3" gutterBottom>
        Mot de passe mis à jour avec succès
      </Typography>
      <Link href="/">Revenir à la page d&apos;accueil</Link>
    </>
  ) : (
    <>
      <Formik
        initialValues={{
          password: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("Mote de passe obligatoire"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (code)
            resetPassword(values.password, code)
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
              type={showPassword ? "text" : "password"}
              {...getFieldProps("password")}
              label="Nouveau mot de passe"
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              my={3}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
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
      </Formik>
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

export default ResetPassword;
