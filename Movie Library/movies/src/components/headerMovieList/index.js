import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Paper
      className="fade-in"
      component="header"
      sx={{
        px: { xs: 1.5, sm: 2.5 },
        py: 1.2,
        mb: 2.5,
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" />
        </IconButton>

        <Typography variant="h4" component="h1" sx={{ textAlign: "center", px: 1 }}>
          {title}
        </Typography>

        <IconButton aria-label="go forward" onClick={() => navigate(1)}>
          <ArrowForwardIcon color="primary" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Header;
