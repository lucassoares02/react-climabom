import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { EquipamentDetails } from "src/sections/account/equipaments-details";
import { CardFloor } from "src/sections/account/card-floor";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const floor = router.query;
  return (
    <>
      <Head>
        <title>Adicionar Equipamento</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Adicionar Equipamento</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <CardFloor />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <EquipamentDetails floor={floor} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
