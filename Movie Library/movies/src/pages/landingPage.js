import React from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SearchIcon from "@mui/icons-material/Search";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link } from "react-router-dom";

const quickOptions = [
  {
    title: "Trending Now",
    text: "Catch what everyone is watching today.",
    path: "/movies/trending/today",
  },
  {
    title: "Upcoming Releases",
    text: "Find the next big theatrical titles.",
    path: "/movies/upcoming",
  },
  {
    title: "Now Playing",
    text: "Browse currently running movies.",
    path: "/movies/playing",
  },
  {
    title: "Power Search",
    text: "Jump to any movie in seconds.",
    path: "/movies/search",
  },
];

const LandingPage = () => {
  return (
    <Paper
      className="fade-in"
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 5,
        minHeight: "78vh",
        background:
          "linear-gradient(130deg, rgba(9,12,22,.98) 0%, rgba(11,18,31,.95) 40%, rgba(42,12,36,.82) 100%)",
        border: "1px solid rgba(255, 92, 92, 0.25)",
      }}
    >
      <Stack spacing={2}>
        <Chip icon={<AutoAwesomeIcon />} label="AuraCinemaX Experience" color="secondary" sx={{ width: "fit-content" }} />
        <Typography variant="h2" sx={{ fontWeight: 800, maxWidth: 920 }}>
          Discover Movies Faster, Smarter, and Better
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
          AuraCinemaX (ACX) helps you find trending movies, upcoming releases, trailers, cast details, and personalized watchlists in one clean flow.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <Button component={Link} to="/home" variant="contained" color="secondary" startIcon={<PlayCircleIcon />} sx={{ borderRadius: 3, px: 2.8 }}>
            Enter Home
          </Button>
          <Button component={Link} to="/movies/search" variant="outlined" startIcon={<SearchIcon />} sx={{ borderRadius: 3, px: 2.8 }}>
            Search Movies
          </Button>
          <Button component={Link} to="/movies/trending/today" variant="outlined" startIcon={<InsightsIcon />} sx={{ borderRadius: 3, px: 2.8 }}>
            Explore Trends
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ mt: 4, display: "grid", gap: 1.4, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        {quickOptions.map((item, idx) => (
          <Paper
            key={item.title}
            component={Link}
            to={item.path}
            className="fade-in"
            sx={{
              p: 2.2,
              borderRadius: 3,
              animationDelay: `${Math.min(idx * 80, 400)}ms`,
              border: "1px solid rgba(255,255,255,0.14)",
              background:
                "linear-gradient(120deg, rgba(15, 21, 34, 0.94), rgba(16, 25, 40, 0.82))",
              transition: "transform .2s ease, border-color .2s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: "rgba(255,92,92,.45)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
              {item.text}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default LandingPage;
