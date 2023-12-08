import Head from "next/head";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography, SvgIcon } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      nome: "",
      senha: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Informe um e-mail válido")
        .max(255)
        .required("E-mail é obrigatório"),
      nome: Yup.string().max(255).required("Nome é obrigatório"),
      senha: Yup.string().max(255).required("Senha é obrigatório"),
    }),
    onSubmit: async (values, helpers) => {
      saveRegister(values);
    },
  });

  async function saveRegister(dataInsert) {
    setLoading(true);
    dataInsert.id = Math.floor(Math.random() * 1000);
    dataInsert.id_permissao = 1;
    console.log("Registrando usuário");
    const dataSend = {
      data: dataInsert,
      table: "mqtt.usuario",
    };
    console.log(dataSend);
    await axios
      .post(`http://172.18.18.254:3001/register`, dataSend)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Registro | Climabom</title>
      </Head>
      <Box
        sx={{
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
              <Typography variant="h4">Cadastro</Typography>
              <Typography color="text.secondary" variant="body2">
                Já possuí conta? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Login
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.nome && formik.errors.nome)}
                  fullWidth
                  helperText={formik.touched.nome && formik.errors.nome}
                  label="Nome"
                  name="nome"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                />
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
                  error={!!(formik.touched.senha && formik.errors.senha)}
                  fullWidth
                  helperText={formik.touched.senha && formik.errors.senha}
                  label="Senha"
                  name="senha"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.senha}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3, backgroundColor: success ? "#15B79E" : "primary" }}
                type="submit"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress />
                ) : success ? (
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <SvgIcon>
                      <CheckIcon />
                    </SvgIcon>
                    Cadastrado com sucesso!
                  </div>
                ) : (
                  "Cadastrar"
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
