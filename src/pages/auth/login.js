import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const auth = useAuth();
  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Informe em e-mail válido!")
        .max(255)
        .required("Email é necessário!"),
      password: Yup.string().max(255).required("Senha é necessária"),
    }),
    onSubmit: async (values, helpers) => {
      login(values);
    },
  });

  async function login(data) {
    setLoading(true);
    console.log(data);
    await axios
      .post(`http://172.18.18.254:3001/login`, data)
      .then(async (response) => {
        if (response.status >= 200 && response.status <= 299) {
          await auth.signIn("demo@devias.io", "Password123!");
          router.push("/floors");
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
    setLoading(false);
  }

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  return (
    <>
      <Head>
        <title>Login | Climabom</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Não possuí conta? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Cadastre-se
                </Link>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="E-mail" value="email" />
            </Tabs>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="E-mail"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Senha"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <FormHelperText sx={{ mt: 1 }}>Informe seus dados para login.</FormHelperText>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3, backgroundColor: error ? "red" : "primary" }}
                type="submit"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress style={{ color: "white", width: 20, height: 20 }} />
                ) : error ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <SvgIcon>
                      <ExclamationCircleIcon />
                    </SvgIcon>
                    Dados incorretos ou inexistentes!
                  </div>
                ) : (
                  "Acessar"
                )}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
