import React from "react";
import Box from "@mui/material/Box";

const TemplatePersonPage = ({ children }) => {

    return (
        <Box className="fade-in">
            {children}
        </Box>
    );
};

export default TemplatePersonPage;
