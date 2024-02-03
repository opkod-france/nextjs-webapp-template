"use client";
import styled from "@emotion/styled";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  TextField as MuiTextField,
  Snackbar,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, SignInOptions } from "next-auth/react";
import {Typography } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";

const TextField = styled(MuiTextField)(spacing);

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Utilisation de useSearchParams
  const callbackUrl = searchParams.get("callbackUrl");

  const [errorState, setErrorState] = useState<string>("");
  return (
    <>
      <Typography variant="h5" align="center" sx={{ mb: 4 }}>
        Connectez-vous à votre compte pour continuer
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email doit être valide")
            .max(255)
            .required("Email est obligatoire"),
          password: Yup.string()
            .max(255)
            .required("Mot de passe est obligatoire"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          callbackUrl as string;
          const signInOptions: SignInOptions = {
            redirect: false,
            ...values,
          };
          if (callbackUrl) {
            signInOptions.callBackUrl = callbackUrl;
          }
          try {
            const res = await signIn("credentials", signInOptions);
            if (res && res.error) return setErrorState(res.error);
            router.replace((callbackUrl as string) || "/");
          } catch (error) {
            // Handle error here, such as displaying an error message to the user
            setSubmitting(false);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, getFieldProps, handleSubmit, isSubmitting, touched }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="Adresse Email"
                error={!!(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                {...getFieldProps("email")}
                my={2}
                inputProps={{
                  "data-testid": "email",
                }}
              />
              <TextField
                type="password"
                label="Mot de passe"
                error={!!(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                {...getFieldProps("password")}
                my={2}
                inputProps={{
                  "data-testid": "password",
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                data-testid="login-button"
              >
                Se connecter
              </Button>
              <Link href="/auth/forgot-password">
                <Button fullWidth color="primary">
                  mot de passe oublié
                </Button>
              </Link>
            </form>
          );
        }}
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
};

export default SignIn;
