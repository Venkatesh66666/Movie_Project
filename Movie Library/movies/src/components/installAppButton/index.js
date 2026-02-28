import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const InstallAppButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (!installPrompt) return null;

  const onInstall = async () => {
    installPrompt.prompt();
    try {
      await installPrompt.userChoice;
    } finally {
      setInstallPrompt(null);
    }
  };

  return (
    <Button
      onClick={onInstall}
      variant="contained"
      color="secondary"
      startIcon={<DownloadForOfflineIcon />}
      sx={{ borderRadius: "999px", px: 1.8, py: 0.6, fontWeight: 700 }}
    >
      Install App
    </Button>
  );
};

export default InstallAppButton;
