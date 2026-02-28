import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { getPosterFallbackDataUri } from "../../util";

export default function MovieCard({ movie, action, index = 0 }) {
  const { favorites } = useContext(MoviesContext);
  const isFavorite = favorites.find((id) => id === movie.id);
  const rating = Number(movie.vote_average || 0).toFixed(1);

  return (
    <Card
      className="fade-in"
      sx={{
        animationDelay: `${Math.min(index * 60, 520)}ms`,
        height: "100%",
        borderRadius: "18px",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 35px rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(61, 217, 214, 0.45)",
        },
      }}
    >
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: "secondary.main" }}>
              <FavoriteIcon sx={{ color: "#261300" }} />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" sx={{ fontWeight: 700 }}>
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        loading="lazy"
        sx={{ height: 440, objectFit: "cover" }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : getPosterFallbackDataUri(movie.title)}
        alt={movie.title}
      />
      <CardContent sx={{ pb: 1 }}>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1">
              <CalendarIcon fontSize="small" /> {movie.release_date || "N/A"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1" sx={{ textAlign: "right" }}>
              <StarRateIcon fontSize="small" /> {rating}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1, mt: "auto", flexWrap: "wrap" }}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="contained" size="medium" color="primary">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
