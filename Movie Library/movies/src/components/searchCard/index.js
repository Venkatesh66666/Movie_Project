import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SearchForm from "../searchForm";

export default function SearchCard() {
  return (
    <Card
      className="fade-in"
      variant="outlined"
      sx={{
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.18)",
        background:
          "linear-gradient(135deg, rgba(22, 24, 33, 0.95), rgba(19, 22, 31, 0.86) 60%, rgba(84, 26, 40, 0.56))",
      }}
    >
      <CardContent sx={{ p: { xs: 2.2, sm: 3 } }}>
        <SearchForm />
      </CardContent>
    </Card>
  );
}
