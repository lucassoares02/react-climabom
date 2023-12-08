import React, { useState } from "react";
import * as XLSX from "xlsx";
const { startOfDay, addMilliseconds, format } = require("date-fns");
import axios from "axios";
import { ScheduleTable } from "src/sections/customer/schedule-table";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";

const XLSXUploader = () => {
  const [xlsxData, setXLSXData] = useState(null);

  const converterHour = (decimal) => {
    const horaInicioMiliSeconds = decimal * 24 * 60 * 60 * 1000;
    const a = addMilliseconds(startOfDay(new Date()), horaInicioMiliSeconds);
    const ass = new Date(horaInicioMiliSeconds);
    const j = format(ass, "HH:mm"); 
    console.log(j);
    return j
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Ajustar a formatação da hora
      const adjustedData = jsonData.slice(1).map((row) => {
        return {
          Dia_Semana: row[0],
          Hora_Inicio: converterHour(row[1]),
          Hora_Fim: converterHour(row[2]),
          Disciplina: row[3],
          Sala: row[4],
        };
      });

      setXLSXData(adjustedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = async () => {
    console.log(xlsxData);
    await axios
      .post(`http://172.18.18.254:3001/import`, { table: "mqtt.agenda", data: xlsxData })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {xlsxData != null ? (
        <Button
          color="inherit"
          onChange={handleSendData}
          startIcon={
            <SvgIcon fontSize="small">
              <CheckIcon />
            </SvgIcon>
          }
        >
          Enviar
        </Button>
      ) : (
        <div />
      )}
      {xlsxData && (
        <div style={{ marginTop: 30 }}>
          <ScheduleTable count={xlsxData.length} items={xlsxData} />
        </div>
      )}
    </div>
  );
};

export default XLSXUploader;
