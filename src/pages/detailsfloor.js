import Head from "next/head";
import { useRouter } from "next/router";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Divider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomersScheduler } from "src/sections/customer/customers-schedule";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";

const Page = () => {
  const router = useRouter();
  const floor = router.query;
  const [equipaments, setEquipaments] = useState([]);
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      dia: "Segunda-Feira",
      hora_inicio: "20:30",
      disciplina: "Mater",
      hora_fim: "22:00",
      id_sala: "12",
    },
  ]);

  useEffect(() => {
    findEquipaments();
    findSchedules();
  }, []);

  async function findEquipaments() {
    await axios
      .get(`http://172.18.18.254:3001/equipament/${floor.id}`)
      .then((response) => {
        setEquipaments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function findSchedules() {
    await axios
      .get(`http://172.18.18.254:3001/agenda/${floor.id}`)
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function publishmessage(indexCommand) {
    equipaments.forEach((element) => {});

    const serialFloor = floor.descricao.replaceAll(" ", "").toLowerCase();

    for (let index = 0; index < equipaments.length; index++) {
      const comando = equipaments[index].comandos[indexCommand].comando;

      await axios
        .get(
          `http://172.18.18.254:3001/publicar/${comando}/${serialFloor}
        `
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Head>
        <title>{floor.descricao}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{floor.descricao}</Typography>

                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
            </Stack>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Typography variant="h6">Equipamentos</Typography>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={() => {
                  router.push({
                    pathname: "/createequipament",
                    query: floor,
                  });
                }}
              >
                Adicionar
              </Button>
            </div>

            {/* <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
              onClick={async () => {
                await axios
                  .post(`http://172.18.18.254:3001/subscribe`, {topic: 'tele/t22/SENSOR'})
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Ler
            </Button> */}

            <div style={{ padding: 20, display: "flex", justifyContent: "space-evenly" }}>
              {equipaments[0]?.comandos.map((item, index) => {
                return (
                  <Button
                    style={{
                      backgroundColor:
                        item.descricao == "Desligar"
                          ? "red"
                          : item.descricao == "Ligar"
                          ? "blue"
                          : "transparent",
                      color:
                        item.descricao == "Desligar" || item.descricao == "Ligar"
                          ? "white"
                          : "primary",
                    }}
                    key={item.id}
                    onClick={() => {
                      publishmessage(index);
                    }}
                  >
                    {item.descricao}
                  </Button>
                );
              })}
            </div>

            <Grid container spacing={3}>
              {equipaments.length == 0 ? (
                <Typography align="center" variant="body1">
                  Você ainda não possui equipamentos
                </Typography>
              ) : (
                equipaments.map((company) => (
                  <Grid xs={12} md={6} lg={4} key={company.id}>
                    <CompanyCard
                      floor={floor}
                      company={company}
                      func={() => {
                        findEquipaments();
                      }}
                    />
                  </Grid>
                ))
              )}
            </Grid>


            <Stack>
              <OverviewLatestOrders orders={schedule} floor={floor} />
            </Stack>

            
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
