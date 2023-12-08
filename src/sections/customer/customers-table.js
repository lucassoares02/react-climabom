import PropTypes from "prop-types";
import {
  Button,
  SvgIcon,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/router";
import AcademicCapIcon from "@heroicons/react/24/solid/AcademicCapIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import axios from "axios";

export const CustomersTable = (props) => {
  const router = useRouter();
  const {
    findFloors,
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  async function removeDevices(id) {
    await axios
      .delete(
        `http://172.18.18.254:3001/floor/${id}
        `
      )
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status >= 200 && response.status <= 299) {
          findFloors();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Bloco</TableCell>
                <TableCell>Andar</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((floor) => {
                const isSelected = selected.includes(floor.id);

                return (
                  <TableRow hover key={floor.id} selected={isSelected}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell
                      onClick={() => {
                        router.push({
                          pathname: "/detailsfloor",
                          query: floor,
                        });
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <SvgIcon color="action" fontSize="small">
                          <AcademicCapIcon />
                        </SvgIcon>
                        <Typography variant="subtitle2">{floor.descricao}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        router.push({
                          pathname: "/detailsfloor",
                          query: floor,
                        });
                      }}
                    >
                      {floor.bloco}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        router.push({
                          pathname: "/detailsfloor",
                          query: floor,
                        });
                      }}
                    >
                      {floor.andar}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          removeDevices(floor.id);
                        }}
                      >
                        <SvgIcon color="action" fontSize="small">
                          <TrashIcon color="red" />
                        </SvgIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
