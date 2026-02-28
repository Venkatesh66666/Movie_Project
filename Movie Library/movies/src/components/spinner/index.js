import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Spinner() {
  return (
    <Stack
      className="fade-in"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: "55vh", textAlign: "center" }}
    >
      <Stack direction="row" spacing={2}>
        <CircularProgress color="primary" />
        <CircularProgress color="secondary" />
      </Stack>
      <Typography variant="body1" color="text.secondary">
        Fetching fresh movie data...
      </Typography>
    </Stack>
  );
}
