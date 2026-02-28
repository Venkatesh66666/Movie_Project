import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BoltIcon from "@mui/icons-material/Bolt";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import LanguageIcon from "@mui/icons-material/Language";
import DevicesIcon from "@mui/icons-material/Devices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const SiteFooter = () => (
  <Box component="footer" className="acx-footer-wrap">
    <Box className="acx-footer-glow" />
    <Box className="acx-footer-card">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}
      >
        <Box>
          <Typography className="acx-footer-title">AuraCinemaX</Typography>
          <Typography className="acx-footer-subtitle">
            Discover trending, latest, regional, and classic cinema in one smooth experience.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip icon={<BoltIcon />} label="Fast Search" color="error" variant="filled" />
          <Chip icon={<SmartDisplayIcon />} label="Trailer Ready" color="primary" variant="filled" />
          <Chip icon={<LanguageIcon />} label="Multi-Language" color="secondary" variant="filled" />
          <Chip icon={<MovieFilterIcon />} label="Curated Lists" color="success" variant="filled" />
        </Stack>
      </Stack>

      <Box className="acx-footer-divider" />

      <Box className="acx-footer-info-grid">
        <Box className="acx-footer-info-item">
          <RocketLaunchIcon fontSize="small" />
          <Box>
            <Typography className="acx-footer-info-title">Performance First</Typography>
            <Typography className="acx-footer-info-text">
              Optimized loading, smooth page transitions, and responsive browsing on mobile, tablet, and desktop.
            </Typography>
          </Box>
        </Box>
        <Box className="acx-footer-info-item">
          <DevicesIcon fontSize="small" />
          <Box>
            <Typography className="acx-footer-info-title">Any Screen Ready</Typography>
            <Typography className="acx-footer-info-text">
              Built as a website now, designed for future app-style usage with install-ready PWA support.
            </Typography>
          </Box>
        </Box>
        <Box className="acx-footer-info-item">
          <AutoAwesomeIcon fontSize="small" />
          <Box>
            <Typography className="acx-footer-info-title">Smart Discovery</Typography>
            <Typography className="acx-footer-info-text">
              Trailers, reviews, language filters, and curated sections help users quickly find what to watch.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
        <Chip label="Data: TMDB API" className="acx-footer-pill" />
        <Chip label="Brand: ACX" className="acx-footer-pill" />
      </Stack>

      <Box className="acx-footer-divider" />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}
      >
        <Typography className="acx-footer-credit">
          Crafted By: <strong>Venkatesh Choppadhandi</strong>
        </Typography>
        <Typography className="acx-footer-copy">
          Copyright {new Date().getFullYear()} AuraCinemaX (ACX). All rights reserved.
        </Typography>
      </Stack>
    </Box>
  </Box>
);

export default SiteFooter;
