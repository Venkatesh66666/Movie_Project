import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InstallAppButton from "../installAppButton";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const primaryNav = [
  { label: "Home", path: "/home" },
  { label: "Search", path: "/movies/search" },
  { label: "Recent", path: "/movies/recent" },
  { label: "Latest", path: "/movies/latest" },
];

const browseNav = [
  { label: "Trending", path: "/movies/trending/today" },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Playing", path: "/movies/playing" },
  { label: "People", path: "/people/popular" },
];

const languageNav = [
  { label: "English", path: "/movies/language/en" },
  { label: "Hindi", path: "/movies/language/hi" },
  { label: "Telugu", path: "/movies/language/te" },
  { label: "Malayalam", path: "/movies/language/ml" },
];

const libraryNav = [
  { label: "Favorites", path: "/movies/favorites" },
  { label: "Watchlist", path: "/movies/watchlist" },
];

const mobileNav = [...primaryNav, ...libraryNav, ...browseNav, ...languageNav];

const navButtonStyles = {
  color: "text.primary",
  borderRadius: "999px",
  px: 1.8,
  py: 0.7,
  minWidth: 72,
  border: "1px solid transparent",
  "&.active": {
    borderColor: "rgba(255, 92, 92, 0.55)",
    backgroundColor: "rgba(255, 92, 92, 0.14)",
  },
};

const SiteHeader = () => {
  const [mobileAnchor, setMobileAnchor] = useState(null);
  const [browseAnchor, setBrowseAnchor] = useState(null);
  const [libraryAnchor, setLibraryAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const mobileOpen = Boolean(mobileAnchor);

  const closeDesktopMenus = () => {
    setBrowseAnchor(null);
    setLibraryAnchor(null);
    setLanguageAnchor(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          background:
            "linear-gradient(180deg, rgba(8, 8, 12, 0.94), rgba(10, 15, 24, 0.84) 70%, rgba(10, 15, 24, 0.58))",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Box className="acx-logo" aria-label="AuraCinemaX logo">
            <Box className="acx-logo__inner">ACX</Box>
            <Box className="acx-logo__shine" />
          </Box>
          <Typography
            component={NavLink}
            to="/"
            variant="h5"
            sx={{ fontWeight: 700, mr: 1, letterSpacing: "0.02em", color: "#ff5c5c", "&:hover": { opacity: 0.95 } }}
          >
            AuraCinemaX
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!isMobile && <InstallAppButton />}

          {isMobile ? (
            <>
              <IconButton aria-label="menu" aria-controls="mobile-menu" onClick={(e) => setMobileAnchor(e.currentTarget)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={mobileAnchor}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={mobileOpen}
                onClose={() => setMobileAnchor(null)}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 220,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(12, 16, 24, 0.96)",
                  },
                }}
              >
                {mobileNav.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => setMobileAnchor(null)} component={NavLink} to={opt.path}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
              {primaryNav.map((opt) => (
                <Button key={opt.label} component={NavLink} to={opt.path} sx={navButtonStyles}>
                  {opt.label}
                </Button>
              ))}

              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={navButtonStyles}
                onClick={(e) => setLibraryAnchor(e.currentTarget)}
              >
                My List
              </Button>
              <Menu
                anchorEl={libraryAnchor}
                open={Boolean(libraryAnchor)}
                onClose={closeDesktopMenus}
                PaperProps={{
                  sx: {
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(12, 16, 24, 0.96)",
                  },
                }}
              >
                {libraryNav.map((opt) => (
                  <MenuItem key={opt.label} component={NavLink} to={opt.path} onClick={closeDesktopMenus}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={navButtonStyles}
                onClick={(e) => setBrowseAnchor(e.currentTarget)}
              >
                Browse
              </Button>
              <Menu
                anchorEl={browseAnchor}
                open={Boolean(browseAnchor)}
                onClose={closeDesktopMenus}
                PaperProps={{
                  sx: {
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(12, 16, 24, 0.96)",
                  },
                }}
              >
                {browseNav.map((opt) => (
                  <MenuItem key={opt.label} component={NavLink} to={opt.path} onClick={closeDesktopMenus}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={navButtonStyles}
                onClick={(e) => setLanguageAnchor(e.currentTarget)}
              >
                Languages
              </Button>
              <Menu
                anchorEl={languageAnchor}
                open={Boolean(languageAnchor)}
                onClose={closeDesktopMenus}
                PaperProps={{
                  sx: {
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(12, 16, 24, 0.96)",
                  },
                }}
              >
                {languageNav.map((opt) => (
                  <MenuItem key={opt.label} component={NavLink} to={opt.path} onClick={closeDesktopMenus}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
