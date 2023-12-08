import { useCallback, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { CardFloor } from "src/sections/account/card-floor";

export const FloorDetails = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    id: Math.floor(Math.random() * 1000),
    descricao: "",
    bloco: "",
    andar: "",
    ip: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = () => {
    console.log("Salvar Dados");
    console.log(values);

    axios
      .post(`http://172.18.18.254:3001/floor`, { data: values, table: "mqtt.salas" })
      .then((response) => {
        console.log("response");
        console.log(response);
        if (200 >= response.status <= 299) {
          router.push("/floors");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6} lg={4}>
        <CardFloor data={values} />
      </Grid>
      <Grid xs={12} md={6} lg={8}>
        <Card>
          <CardHeader subheader="Adicione informações da sala" title="Sala" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    helperText="Informe a descrição da sala"
                    label="Descrição"
                    name="descricao"
                    onChange={handleChange}
                    required
                    value={values.descricao}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bloco"
                    name="bloco"
                    onChange={handleChange}
                    required
                    value={values.bloco}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Andar"
                    name="andar"
                    onChange={handleChange}
                    required
                    value={values.andar}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="IP"
                    name="ip"
                    onChange={handleChange}
                    value={values.ip}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <LoadingButton onClick={handleSubmit} variant="contained">
              Salvar
            </LoadingButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
