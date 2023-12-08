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

export const ScheduleTable = (props) => {
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
                <TableCell>Dia da semana</TableCell>
                <TableCell>Hora início</TableCell>
                <TableCell>Hora fim</TableCell>
                <TableCell>Disciplina</TableCell>
                <TableCell>Sala</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((itemSchedule) => {
                const isSelected = selected.includes(itemSchedule.id);

                return (
                  <TableRow hover key={itemSchedule.Sala} selected={isSelected}>
                    <TableCell>
                      <Typography variant="subtitle2">{itemSchedule.Dia_Semana}</Typography>
                    </TableCell>
                    <TableCell>{itemSchedule.Hora_Inicio}</TableCell>
                    <TableCell>{itemSchedule.Hora_Fim}</TableCell>
                    <TableCell>{itemSchedule.Disciplina}</TableCell>
                    <TableCell>{itemSchedule.Sala}</TableCell>
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

ScheduleTable.propTypes = {
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
