import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const CompanyCard = (props) => {
  const { company, floor, func } = props;
  const [on, setOn] = useState(false);
  const [count, setCount] = useState(0);
  const router = useRouter();

  async function power(type) {
    const url = type
      ? `http://172.18.18.254:3001/publicar/${ligar}`
      : `http://172.18.18.254:3001/publicarOff/${desligar}`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function removeDevices(id) {
    await axios
      .delete(
        `http://172.18.18.254:3001/equipament/${id}
        `
      )
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status >= 200 && response.status <= 299) {
          func();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f2f2f2",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <img src="/assets/products/cond.png" width={100} />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {company.descricao}
        </Typography>
        <Typography align="center" variant="body1">
          {company.marca + " | " + company.modelo}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Atualizado à 3 min...
          </Typography>
        </Stack>

        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            onClick={() => {
              removeDevices(company.id);
            }}
          >
            <SvgIcon color="action" fontSize="small">
              <TrashIcon color="red" />
            </SvgIcon>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
