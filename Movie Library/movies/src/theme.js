import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3dd9d6",
    },
    secondary: {
      main: "#ffb347",
    },
    background: {
      default: "#060b14",
      paper: "rgba(13, 22, 36, 0.78)",
    },
    text: {
      primary: "#eef6ff",
      secondary: "rgba(220, 232, 255, 0.82)",
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          background:
            "radial-gradient(1200px 500px at 15% -10%, rgba(61, 217, 214, 0.18), transparent 55%), radial-gradient(900px 600px at 100% 10%, rgba(255, 179, 71, 0.16), transparent 52%), #060b14",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(130, 196, 255, 0.16)",
          backgroundColor: "rgba(13, 22, 36, 0.9)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(130, 196, 255, 0.16)",
          backgroundColor: "rgba(13, 22, 36, 0.88)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;
