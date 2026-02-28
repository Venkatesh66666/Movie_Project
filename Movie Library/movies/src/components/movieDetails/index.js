import React, { useContext, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import {Language} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useQuery } from "react-query";
import { getMovieVideos } from "../../api/tmdb-api";
import { buildYoutubeTrailerSearchUrl, estimateMovieBudget } from "../../util";
import { MoviesContext } from "../../contexts/moviesContext";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const chooseBestTrailer = (videos = []) => {
    if (!videos.length) return null;

    const youtubeVideos = videos.filter((v) => v.site === "YouTube" && v.key);
    if (!youtubeVideos.length) return null;

    const preferred = youtubeVideos.find((v) => v.type === "Trailer" && v.official);
    if (preferred) return preferred;

    const trailer = youtubeVideos.find((v) => v.type === "Trailer");
    if (trailer) return trailer;

    const teaser = youtubeVideos.find((v) => v.type === "Teaser");
    if (teaser) return teaser;

    return youtubeVideos[0];
};

const computeFinancialSnapshot = (movie) => {
    const budget = Number(movie.budget || 0);
    const hasBudget = budget > 0;
    const estimated = hasBudget ? null : estimateMovieBudget(movie);
    return {
        budget,
        hasBudget,
        estimatedBudget: estimated?.amount || 0,
        estimateConfidence: estimated?.confidence || null,
        displayLabel: hasBudget
            ? `$${budget.toLocaleString()}`
            : `~$${Number(estimated?.amount || 0).toLocaleString()}`,
        budgetType: hasBudget ? "Verified Budget" : "Estimated Budget (Unverified)",
    };
};

const MovieDetails = ({ movie }) => {
    const { getFavorites, getToWatchList, addToFavorites, removeFromFavorites, addToWatch, removeFromToWatch } = useContext(MoviesContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [trailerOpen, setTrailerOpen] = useState(false);

    const { data: videoData } = useQuery(
        ["movieVideos", { id: movie.id }],
        getMovieVideos,
        { enabled: Boolean(movie?.id) }
    );

    const bestTrailer = chooseBestTrailer(videoData?.results || []);
    const trailerUrl = bestTrailer ? `https://www.youtube.com/embed/${bestTrailer.key}?autoplay=1` : null;
    const trailerWatchUrl = bestTrailer
        ? `https://www.youtube.com/watch?v=${bestTrailer.key}`
        : buildYoutubeTrailerSearchUrl(movie.title, movie.release_date);
    const financial = useMemo(() => computeFinancialSnapshot(movie), [movie]);
    const isFavorite = getFavorites().includes(movie.id);
    const isInWatchlist = getToWatchList().includes(movie.id);

    return (
        <>
            <Paper sx={{ p: 2, borderRadius: 3, mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    Movie Budget
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} flexWrap="wrap">
                    <Chip
                        color={financial.hasBudget ? "primary" : "warning"}
                        label={`${financial.budgetType}: ${financial.displayLabel}`}
                    />
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    {financial.hasBudget
                        ? "Budget value is from TMDB movie data."
                        : `No verified TMDB budget for this movie. Showing a metadata-based estimate (${financial.estimateConfidence} confidence).`}
                </Typography>
            </Paper>

            <Paper sx={{ p: 1.3, borderRadius: 3, mb: 2 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} flexWrap="wrap">
                    <Button
                        variant={isFavorite ? "contained" : "outlined"}
                        color="secondary"
                        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        onClick={() => (isFavorite ? removeFromFavorites(movie) : addToFavorites(movie))}
                    >
                        {isFavorite ? "Remove Favorite" : "Add Favorite"}
                    </Button>

                    <Button
                        variant={isInWatchlist ? "contained" : "outlined"}
                        color="primary"
                        startIcon={isInWatchlist ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
                        onClick={() => (isInWatchlist ? removeFromToWatch(movie) : addToWatch(movie))}
                    >
                        {isInWatchlist ? "In Watchlist" : "Add Watchlist"}
                    </Button>

                    <Button
                        component={Link}
                        to="/reviews/form"
                        state={{ movieId: movie.id }}
                        variant="outlined"
                        startIcon={<RateReviewIcon />}
                    >
                        Write Review
                    </Button>
                </Stack>
            </Paper>

            <Typography variant="h5" component="h3" sx={{mb: 1}}>
                Overview
            </Typography>

            <Typography variant="body1" component="p" color="text.secondary" sx={{lineHeight: 1.85}}>
                {movie.overview}
            </Typography>

            <Paper
                component="ul"
                sx={{...root, mt: 2, borderRadius: 3}}
            >
                <li>
                    <Chip label="Genres" sx={{...chip}} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{...chip}} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{...root, borderRadius: 3}}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={financial.hasBudget ? `Budget: ${financial.displayLabel}` : `Estimated: ${financial.displayLabel}`}
                    color={financial.hasBudget ? "default" : "warning"}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${Number(movie.vote_average || 0).toFixed(1)} (${movie.vote_count})`}
                />
                <Chip
                    icon={<Language />}
                    label={`Original Language: ${movie.original_language}`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>

            <Paper
                component="ul"
                sx={{...root, borderRadius: 3}}
            >
                <li>
                    <Chip label="Production Countries" sx={{...chip}} color="secondary" />
                </li>
                {movie.production_countries.map((country) => (
                    <li key={country.name}>
                        <Chip label={country.name} sx={{...chip}} />
                    </li>
                ))}
            </Paper>


            <Paper
                component="ul"
                sx={{...root, borderRadius: 3}}
            >
                <li>
                    <Chip label="Production Companies" sx={{...chip}} color="secondary" />
                </li>
                {movie.production_companies.map((company) => (
                    <li key={company.name}>
                        <Chip label={company.name + " (" + company.origin_country + ")"} sx={{...chip}} />
                    </li>
                ))}
            </Paper>

            <ButtonGroup orientation="vertical" aria-label="Vertical button group" variant="text" sx={{ alignItems: "flex-start", mt: 1 }}>

                <Button
                    component={Link}
                    to={`/similar`}
                    state={{
                        movieId: movie.id,
                    }}
                >
                    Similar Movies (Stateful)
                </Button>

                <Button
                    component={Link}
                    to={`/movies/${movie.id}/similar`}
                >
                    Similar Movies (Shareable URL)
                </Button>

                <Button
                    component={Link}
                    to={`/movies/${movie.id}/credits`}
                >
                    Cast and Credits
                </Button>

                <Button
                    color="secondary"
                    onClick={() => setTrailerOpen(true)}
                    startIcon={<SmartDisplayIcon />}
                >
                    {bestTrailer ? "Watch Trailer" : "Find Trailer on YouTube"}
                </Button>


            </ButtonGroup>

            <Dialog open={trailerOpen} onClose={() => setTrailerOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{movie.title} Trailer</DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                    {trailerUrl ? (
                        <Stack spacing={2}>
                            <iframe
                                title={`${movie.title} trailer`}
                                width="100%"
                                height="420"
                                src={trailerUrl}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: 0, borderRadius: 10 }}
                            />
                            <Button
                                component="a"
                                href={trailerWatchUrl}
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                            >
                                Open on YouTube
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={2}>
                            <Alert severity="info">
                                No direct TMDB trailer was found. You can open YouTube results for this movie trailer.
                            </Alert>
                            <Button
                                component="a"
                                href={trailerWatchUrl}
                                target="_blank"
                                rel="noreferrer"
                                color="secondary"
                                variant="contained"
                            >
                                Search Trailer on YouTube
                            </Button>
                        </Stack>
                    )}
                </DialogContent>
            </Dialog>



            <Fab
                color="secondary"
                variant="extended"
                onClick={() =>setDrawerOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: '1em',
                    right: '1em',
                    zIndex: 1000
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Stack sx={{p: 1.5}}>
                    <MovieReviews movie={movie} />
                </Stack>
            </Drawer>
        </>
    );
};
export default MovieDetails ;
