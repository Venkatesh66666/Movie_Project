import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        aria-label="back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1100 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTop;
