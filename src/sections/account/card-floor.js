import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";

const user = {
  avatar: "/assets/icons/living.svg",
  city: "UCL",
  country: "Manguinhos",
  jobTitle: "Senior Developer",
  name: "UCL",
  timezone: "Brasil",
};

export const CardFloor = (props) => {
  const { data } = props;
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src="/assets/products/cond.png" width={80} />
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.country}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Informações
        </Button>
      </CardActions>
    </Card>
  );
};
