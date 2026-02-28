import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";

const quickSuggestions = ["Dune", "Oppenheimer", "Interstellar", "Avengers"];

const SearchForm = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { addSearchQuery } = useContext(MoviesContext);

  const onSubmit = (value) => {
    const cleaned = value.trim();
    if (!cleaned) return;
    addSearchQuery(cleaned);
    navigate(`/movies/search/${encodeURIComponent(cleaned)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={2.2}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Find Your Next Movie
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search by title and jump straight into details, trailers, cast and similar movies.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <TextField
            id="movie-title-search"
            placeholder="Search movies like 'Inception'..."
            type="search"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.06)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "999px", px: 3.5, minHeight: 44, fontWeight: 700 }}
          >
            Search
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {quickSuggestions.map((item) => (
            <Button
              key={item}
              size="small"
              variant="text"
              color="inherit"
              onClick={() => onSubmit(item)}
              sx={{ borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {item}
            </Button>
          ))}
        </Stack>
      </Stack>
    </form>
  );
};

export default SearchForm;
