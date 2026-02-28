import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieHeader = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Paper
      className="fade-in"
      component="header"
      sx={{ p: 2, mb: 2.5, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" />
      </IconButton>

      <Stack spacing={0.8} alignItems="center" sx={{ px: 2 }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          {movie.title}
          {movie.homepage && (
            <MuiLink href={movie.homepage} target="_blank" rel="noreferrer" sx={{ ml: 1 }}>
              <HomeIcon color="secondary" sx={{ verticalAlign: "middle" }} />
            </MuiLink>
          )}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
          {movie.tagline ? `"${movie.tagline}"` : " "}
        </Typography>
      </Stack>

      <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon color="primary" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
