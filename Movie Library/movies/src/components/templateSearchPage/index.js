import React from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import SearchCard from "../searchCard";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

function TemplateSearchPage({ movies = [], action, pagination, page, location }) {
  const currentPage = Number(page) || 1;
  const navigate = useNavigate();

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      navigate(`${location}/page/${currentPage - 1}`);
    } else if (direction === "next") {
      navigate(`${location}/page/${currentPage + 1}`);
    }
  };

  return (
    <Grid container spacing={2.5} className="fade-in">
      <Grid size={12}>
        <Header title="Search" />
        {pagination && (
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
            <IconButton onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="text.secondary">
              Page {currentPage}
            </Typography>
            <IconButton onClick={() => handlePageChange("next")} disabled={currentPage === 500}>
              <ArrowForwardIcon />
            </IconButton>
          </Stack>
        )}
      </Grid>

      <Grid size={12}>
        <SearchCard />
      </Grid>
      <Grid size={12}>
        {movies.length ? (
          <MovieList action={action} movies={movies} />
        ) : (
          <Alert severity="info" sx={{ borderRadius: 3 }}>
            Start with a movie title above to see results.
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default TemplateSearchPage;
