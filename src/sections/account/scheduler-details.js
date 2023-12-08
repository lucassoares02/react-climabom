import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";

export const SchedulerDetails = (props) => {
  const { floor } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    hora_inicio: "",
    hora_fim: "",
    disciplina: "",
    dia: "",
    id_sala: floor.id,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    console.log("Salvar Dados");

    console.log({
      data: values,
      table: "mqtt.agenda",
    });

    axios
      .post(`http://172.18.18.254:3001/agenda`, {
        data: values,
        table: "mqtt.agenda",
      })
      .then((response) => {
        console.log(response.data);
        if (200 <= response.status <= 299) {
          router.push({
            pathname: "/detailsfloor",
            query: floor,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader subheader="Adicione as informações" title="Equipamento" />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Hora início"
                required
                name="hora_inicio"
                onChange={handleChange}
                value={values.hora_inicio}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Hora fim"
                name="hora_fim"
                onChange={handleChange}
                required
                value={values.hora_fim}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Select
                fullWidth
                labelId="dia"
                name="dia"
                value={values.dia}
                label="Dia da Semana"
                onChange={handleChange}
              >
                <MenuItem value="Segunda-feira">Segunda-feira</MenuItem>
                <MenuItem value="Terça-feira">Terça-feira</MenuItem>
                <MenuItem value="Quarta-feira">Quarta-feira</MenuItem>
                <MenuItem value="Quinta-feira">Quinta-feira</MenuItem>
                <MenuItem value="Sexta-feira">Sexta-feira</MenuItem>
                <MenuItem value="Sábado">Sábado</MenuItem>
                <MenuItem value="Domingo">Domingo</MenuItem>
              </Select>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Disciplina"
                name="disciplina"
                onChange={handleChange}
                required
                value={values.disciplina}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <LoadingButton loading={loading} onClick={handleSubmit} variant="contained">
          Salvar
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
