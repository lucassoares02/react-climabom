import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CardFloor } from "src/sections/account/card-floor";
import { useRouter } from "next/router";
import { SchedulerDetails } from "src/sections/account/scheduler-details";

const CreateScheduler = () => {
  const router = useRouter();
  const floor = router.query;
  return (
    <>
      <Head>
        <title>Agendamento</title>
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
              <Typography variant="h4">Agendamento</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <CardFloor />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <SchedulerDetails floor={floor} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
CreateScheduler.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateScheduler;
