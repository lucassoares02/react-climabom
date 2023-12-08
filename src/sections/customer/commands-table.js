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
import PowerIcon from "@heroicons/react/24/solid/PowerIcon";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import CalendarDaysIcon from "@heroicons/react/24/solid/CalendarDaysIcon";



export const CommandsTable = (props) => {
  const router = useRouter();
  const {
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Comando</TableCell>
                <TableCell>Protocolo</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((command) => {
                const isSelected = selected.includes(command.id);

                return (
                  <TableRow
                    onClick={() => {
                      router.push({
                        pathname: "/commands",
                      });
                    }}
                    hover
                    key={command.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(command.id);
                          } else {
                            onDeselectOne?.(command.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <SvgIcon color="action" fontSize="small">
                          <AcademicCapIcon />
                        </SvgIcon>
                        <Typography variant="subtitle2">{command.descricao}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{command.comando}</TableCell>
                    <TableCell>{command.id_protocolo}</TableCell>
                    <TableCell>
                      {" "}
                      <Button color="inherit">
                        <SvgIcon fontSize="small">
                          <PowerIcon />
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

CommandsTable.propTypes = {
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
