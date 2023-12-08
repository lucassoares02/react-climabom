import { useCallback, useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

export const EquipamentDetails = (props) => {
  const { floor } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    id: 0,
    descricao: "",
    modelo: "",
    marca: "",
    id_protocolo: ""
  });

  const [protocol, setProtocol] = useState([]);

  useEffect(() => {
    fetchProtocol();
  }, []);

  function fetchProtocol() {
    axios
      .get("http://172.18.18.254:3001/protocols")
      .then((response) => {
        setProtocol(response.data);
      })
      .catch((error) => {
        console.log(`Error Fetch Protocol: ${error}`);
      });
  }

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    values.id = Math.floor(Math.random() * 1000);
    console.log("Salvar Dados");

    axios
      .post(`http://172.18.18.254:3001/equipament`, {
        data: values,
        table: "mqtt.equipamento",
        id_sala: floor.id,
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

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    // Cria uma cópia do estado atual
    const newCommands = [...commands];

    // Atualiza o valor no índice específico
    newCommands[index] = {
      ...newCommands[index],
      [name]: value,
    };

    // Atualiza o estado com a nova array
    setCommands(newCommands);
  };

  return (
    <Card>
      <CardHeader subheader="Adicione informações do equipamento" title="Equipamento" />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Marca"
                required
                name="marca"
                onChange={handleChange}
                value={values.marca}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Modelo"
                name="modelo"
                onChange={handleChange}
                required
                value={values.modelo}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12}>
              <TextField
                fullWidth
                helperText="Informe uma descrição para o equipamento"
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                value={values.descricao}
              />
            </Grid>
          </Grid>

          <Divider />
          <CardHeader
            title="Protocolo"
            subheader="Selecione o protocolo utilizado pelo equipamento"
          />
          <Grid container>
            <Grid xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel>Protocolo</InputLabel>
                <Select
                  labelId="id_protocolo"
                  name="id_protocolo"
                  value={values.id_protocolo}
                  label="Protocolo"
                  onChange={handleChange}
                >
                  {protocol.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.descricao}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
