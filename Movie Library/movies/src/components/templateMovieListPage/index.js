import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

function MovieListPageTemplate({ movies, title, action, pagination, page, location }) {
  const currentPage = Number(page) || 1;
  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [popularityFilter, setPopularityFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("popularity_desc");
  const genreId = Number(genreFilter);
  const releaseYearFrom = Number(yearFilter) || 0;

  const resolvedPopularity =
    popularityFilter === "popular" ? 1000 : popularityFilter === "hype" ? 2000 : 0;

  const displayedMovies = [...movies]
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => m.vote_average >= Number(ratingFilter))
    .filter((m) => m.popularity >= resolvedPopularity)
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => {
      if (!releaseYearFrom) return true;
      const year = Number((m.release_date || "").slice(0, 4));
      return year >= releaseYearFrom;
    })
    .sort((a, b) => {
      if (sortBy === "rating_desc") return b.vote_average - a.vote_average;
      if (sortBy === "release_desc") return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      if (sortBy === "title_asc") return (a.title || "").localeCompare(b.title || "");
      return b.popularity - a.popularity;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "popularity") setPopularityFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "sort") setSortBy(value);
    else setGenreFilter(value);
  };

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
        <Header title={title} />
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

      <Grid size={{ xs: 12, md: 3, lg: 2.8 }}>
        <Box sx={{ position: { md: "sticky" }, top: { md: 90 } }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            popularityFilter={popularityFilter}
            yearFilter={yearFilter}
            sortBy={sortBy}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 9, lg: 9.2 }}>
        {displayedMovies.length ? (
          <MovieList action={action} movies={displayedMovies} />
        ) : (
          <Alert severity="info" sx={{ borderRadius: 3 }}>
            No movies match the selected filters. Try lowering the rating, popularity, or year filter.
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
