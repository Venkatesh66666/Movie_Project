import React from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Stack } from "@mui/material";

const formControl = {
  width: "100%",
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  return (
    <Card variant="outlined" className="fade-in" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon /> Filter Movies
        </Typography>

        <Stack spacing={2.2}>
          <TextField
            sx={formControl}
            id="movie-search-field"
            label="Search title"
            variant="outlined"
            value={props.titleFilter}
            onChange={(e) => props.onUserInput("name", e.target.value)}
          />

          <FormControl sx={formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              label="Genre"
              value={props.genreFilter}
              onChange={(e) => props.onUserInput("genre", e.target.value)}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            sx={formControl}
            id="movie-year-field"
            label="Release year from"
            type="number"
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            value={props.yearFilter}
            onChange={(e) => props.onUserInput("year", e.target.value)}
          />

          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Minimum Rating
            </Typography>
            <Slider
              aria-label="Rating"
              value={Number(props.ratingFilter)}
              onChange={(_, value) => props.onUserInput("rating", value)}
              valueLabelDisplay="auto"
              step={0.5}
              min={0}
              max={10}
              color="secondary"
            />
          </div>

          <FormControl>
            <FormLabel>Popularity</FormLabel>
            <RadioGroup
              value={props.popularityFilter}
              onChange={(e) => props.onUserInput("popularity", e.target.value)}
              name="popularity-options"
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="popular" control={<Radio />} label="Popular" />
              <FormControlLabel value="hype" control={<Radio />} label="Hype" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={formControl}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              label="Sort by"
              value={props.sortBy}
              onChange={(e) => props.onUserInput("sort", e.target.value)}
            >
              <MenuItem value="popularity_desc">Popularity (High to Low)</MenuItem>
              <MenuItem value="rating_desc">Rating (High to Low)</MenuItem>
              <MenuItem value="release_desc">Newest First</MenuItem>
              <MenuItem value="title_asc">Title (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}
