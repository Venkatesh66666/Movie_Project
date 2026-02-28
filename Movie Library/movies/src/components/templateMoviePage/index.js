import React from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import { getMovieImages } from "../../api/tmdb-api";
import { getPosterFallbackDataUri } from "../../util";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery(["images", { id: movie.id }], getMovieImages);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data.posters || [];
  const galleryImages = images.length
    ? images
    : [{ file_path: null, fallback: getPosterFallbackDataUri(movie.title) }];

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={2.5} className="fade-in">
        <Grid size={{ xs: 12, lg: 3 }}>
          <Paper sx={{ p: 1.2, borderRadius: 3 }}>
            <ImageList
              cols={1}
              sx={{
                m: 0,
                maxHeight: { xs: 380, lg: "calc(100vh - 170px)" },
                overflowY: "auto",
                borderRadius: 2,
              }}
            >
              {galleryImages.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={image.file_path ? `https://image.tmdb.org/t/p/w342/${image.file_path}` : image.fallback}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                    style={{ borderRadius: 10 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
