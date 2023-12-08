import { format } from "date-fns";
import PropTypes from "prop-types";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useRouter } from "next/router";
import axios from "axios";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx, floor } = props;
  const router = useRouter();

  async function confirmAgenda() {
    await axios
      .get(`http://172.18.18.254:3001/agendar`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Agendamentos" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Matéria</TableCell>
                <TableCell>Dia da Semana</TableCell>
                <TableCell>Início</TableCell>
                <TableCell>Fim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.disciplina}</TableCell>
                    <TableCell>{order.dia}</TableCell>
                    <TableCell>
                      <SeverityPill color="success">{order.hora_inicio}</SeverityPill>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color="warning">{order.hora_fim}</SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <CardActions sx={{ justifyContent: "space-between", padding: 5 }}>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <CheckIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => {
            confirmAgenda();
          }}
        >
          Agendar agora
        </Button>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          size="large"
          variant="contained"
          onClick={() => {
            router.push({
              pathname: "/createscheduler",
              query: floor,
            });
          }}
        >
          Novo agendamento
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
