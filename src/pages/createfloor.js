import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FloorDetails } from 'src/sections/account/floor-details';
import { CardFloor } from 'src/sections/account/card-floor';

const Page = () => (
  <>
    <Head>
      <title>
        Account | Climabom
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Criar Sala
            </Typography>
          </div>
          <div>
            {/* <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <CardFloor />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <FloorDetails />
              </Grid>
            </Grid> */}
                <FloorDetails />
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
