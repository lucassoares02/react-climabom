import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  FormControl,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { LoadingButton } from "@mui/lab";

export const CommandDetails = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [commands, setCommands] = useState([
    { descricao: "Ligar", comando: "" },
    { descricao: "Desligar", comando: "" },
  ]);

  const [values, setValues] = useState({
    id_protocolo: 0,
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

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Salvar Dados");

    for (let index = 0; index < commands.length; index++) {
      values.id = Math.floor(Math.random() * 1000);
      values.descricao = commands[index].descricao;
      values.comando = commands[index].comando;

      await axios
        .post(`http://172.18.18.254:3001/command`, {
          data: values,
          table: "mqtt.comandos",
        })
        .then((response) => {
          console.log(response.data);
          if (200 <= response.status <= 299) {
            router.push({
              pathname: "/commands",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newCommands = [...commands];
    newCommands[index] = {
      ...newCommands[index],
      [name]: value,
    };
    setCommands(newCommands);
  };

  return (
    <Card>
      <CardHeader subheader="Informações do comando" title="Comando" />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Divider style={{ height: 20 }} />
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
          <Divider style={{ height: 20 }} />

          {commands.map((command, index) => (
            <Grid key={index} container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="descricao"
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  value={command.descricao}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Comando"
                  name="comando"
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  value={command.comando}
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        <div style={{ justifyContent: "flex-end", display: "flex", flexDirection: "row" }}>
          <Button
            style={{ marginTop: 20 }}
            onClick={() => {
              const newCommands = [...commands, { descricao: "", comando: "" }];
              setCommands(newCommands);
            }}
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
          >
            Novo
          </Button>
        </div>
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
