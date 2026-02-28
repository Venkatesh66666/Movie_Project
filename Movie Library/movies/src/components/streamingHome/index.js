import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ToysIcon from "@mui/icons-material/Toys";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link, useNavigate } from "react-router-dom";
import { getPosterFallbackDataUri } from "../../util";

const HERO_ROTATE_MS = 30000;
const HERO_FIGURES = [
  { key: "toy", icon: ToysIcon, label: "ToyBot Pick", className: "acx-figure--one" },
  { key: "rocket", icon: RocketLaunchIcon, label: "Hero Boost", className: "acx-figure--two" },
  { key: "game", icon: SportsEsportsIcon, label: "Quick Play", className: "acx-figure--three" },
];

const buildPoster = (path, title) => (path ? `https://image.tmdb.org/t/p/w500/${path}` : getPosterFallbackDataUri(title));
const buildBackdrop = (path, title) => (path ? `https://image.tmdb.org/t/p/w780/${path}` : getPosterFallbackDataUri(title));
const formatRating = (voteAverage, voteCount) => `${(voteAverage ?? 0).toFixed(1)} (${voteCount ?? 0})`;

const MovieRow = ({ title, movies, seeAllPath }) => {
  return (
    <Box sx={{ mt: 3.8 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {seeAllPath && (
          <Button component={Link} to={seeAllPath} color="secondary" endIcon={<ArrowForwardIosIcon sx={{ fontSize: 13 }} />}>
            See all
          </Button>
        )}
      </Stack>

      <Box
        sx={{
          display: "flex",
          gap: 1.6,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: 99,
          },
        }}
      >
        {movies.map((movie, index) => (
          <Paper
            key={movie.id}
            component={Link}
            to={`/movies/${movie.id}`}
            className={index < 8 ? "fade-in" : ""}
            sx={{
              width: { xs: 162, sm: 176, md: 188 },
              minWidth: { xs: 162, sm: 176, md: 188 },
              p: 0.9,
              borderRadius: 3,
              overflow: "hidden",
              animationDelay: `${Math.min(index * 70, 500)}ms`,
              transition: "transform .2s ease, border-color .2s ease",
              contentVisibility: "auto",
              containIntrinsicSize: "320px",
              "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(255, 92, 92, 0.45)" },
            }}
          >
            <Box
              component="img"
              src={buildPoster(movie.poster_path, movie.title)}
              alt={movie.title}
              loading="lazy"
              sx={{
                width: "100%",
                aspectRatio: "2 / 3",
                borderRadius: 2,
                objectFit: "cover",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            />
            <Typography sx={{ mt: 1, fontWeight: 700 }} noWrap>
              {movie.title}
            </Typography>
            <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mt: 0.6 }}>
              <Chip
                icon={<StarIcon sx={{ fontSize: "15px !important", color: "#ffc64a !important" }} />}
                label={(movie.vote_average ?? 0).toFixed(1)}
                size="small"
                sx={{ fontWeight: 700 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {movie.release_date?.slice(0, 4) || "N/A"}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const StreamingHome = ({ featuredMovies = [], sections, onAddToWatch }) => {
  const [search, setSearch] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeFigure, setActiveFigure] = useState("");
  const [figureToast, setFigureToast] = useState({ open: false, message: "", movie: null });
  const navigate = useNavigate();

  const safeFeaturedMovies = featuredMovies.filter(Boolean);
  const featuredMovie = safeFeaturedMovies[heroIndex] || safeFeaturedMovies[0];

  useEffect(() => {
    if (safeFeaturedMovies.length <= 1) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % safeFeaturedMovies.length);
    }, HERO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [safeFeaturedMovies.length]);

  useEffect(() => {
    if (heroIndex > safeFeaturedMovies.length - 1) setHeroIndex(0);
  }, [heroIndex, safeFeaturedMovies.length]);

  const featuredMeta = useMemo(() => {
    if (!featuredMovie) return null;
    return {
      year: featuredMovie.release_date?.slice(0, 4) || "N/A",
      language: (featuredMovie.original_language || "en").toUpperCase(),
      rating: formatRating(featuredMovie.vote_average, featuredMovie.vote_count),
    };
  }, [featuredMovie]);

  const allSectionMovies = useMemo(() => {
    const map = new Map();
    sections.forEach((section) => {
      (section.movies || []).forEach((movie) => {
        if (movie && !map.has(movie.id)) map.set(movie.id, movie);
      });
    });
    return [...map.values()];
  }, [sections]);

  const getToyBotPick = () => {
    if (!allSectionMovies.length) return null;
    const currentYear = Number((featuredMovie?.release_date || "").slice(0, 4) || 0);
    const currentLang = featuredMovie?.original_language || "";
    const ranked = [...allSectionMovies].sort((a, b) => {
      const scoreA =
        (a.vote_average || 0) * Math.log10((a.vote_count || 0) + 10) +
        ((a.original_language || "") === currentLang ? 1 : 0) +
        (currentYear && Number((a.release_date || "").slice(0, 4) || 0) >= currentYear - 10 ? 0.35 : 0);
      const scoreB =
        (b.vote_average || 0) * Math.log10((b.vote_count || 0) + 10) +
        ((b.original_language || "") === currentLang ? 1 : 0) +
        (currentYear && Number((b.release_date || "").slice(0, 4) || 0) >= currentYear - 10 ? 0.35 : 0);
      return scoreB - scoreA;
    });
    return ranked.find((movie) => movie?.id !== featuredMovie?.id) || ranked[0] || null;
  };

  const openFigureToast = (message, movie = null) => {
    setFigureToast({ open: true, message, movie });
  };

  const handleFigureAction = (key) => {
    setActiveFigure(key);
    setTimeout(() => setActiveFigure(""), 450);

    if (key === "rocket") {
      if (safeFeaturedMovies.length > 1) {
        const next = (heroIndex + 1) % safeFeaturedMovies.length;
        const nextMovie = safeFeaturedMovies[next];
        setHeroIndex(next);
        openFigureToast(`Hero Boost activated: ${nextMovie.title}`);
      } else {
        openFigureToast("Hero Boost needs more featured movies.");
      }
      return;
    }

    if (key === "toy") {
      const pick = getToyBotPick();
      if (!pick) {
        openFigureToast("ToyBot could not find a recommendation right now.");
        return;
      }
      onAddToWatch(pick);
      const heroPickIndex = safeFeaturedMovies.findIndex((movie) => movie.id === pick.id);
      if (heroPickIndex >= 0) setHeroIndex(heroPickIndex);
      openFigureToast(`ToyBot picked: ${pick.title}. Added to Watchlist.`, pick);
      setTimeout(() => navigate(`/movies/${pick.id}`), 260);
      return;
    }

    if (key === "game") {
      if (!featuredMovie?.id) {
        openFigureToast("Quick Play is unavailable right now.");
        return;
      }
      openFigureToast(`Quick Play: Opening ${featuredMovie.title}`);
      setTimeout(() => navigate(`/movies/${featuredMovie.id}`), 180);
    }
  };

  const handleSearch = () => {
    const query = search.trim();
    if (!query) return;
    navigate(`/movies/search/${encodeURIComponent(query)}`);
  };

  if (!featuredMovie) {
    return <Alert severity="info">No featured movie available right now.</Alert>;
  }

  return (
    <Paper
      className="fade-in"
      sx={{
        borderRadius: { xs: 4, md: 5 },
        overflow: "hidden",
        p: { xs: 2, md: 3 },
        minHeight: "78vh",
        border: "1px solid rgba(255, 92, 92, 0.32)",
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
        <TextField
          placeholder="Search titles here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          sx={{
            width: { xs: "100%", sm: 420, md: 460 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "999px",
              backgroundColor: "rgba(2, 4, 12, 0.58)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/movies/watchlist" sx={{ borderRadius: "999px" }} color="inherit">
            Watchlist
          </Button>
          <Button onClick={handleSearch} variant="contained" color="secondary" sx={{ borderRadius: "999px", px: 2.5 }}>
            Search
          </Button>
        </Stack>
      </Stack>

      <Paper
        sx={{
          mt: 2.2,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "rgba(6, 10, 18, 0.86)",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        <Box className="acx-figures-layer">
          {HERO_FIGURES.map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.key}
                component="button"
                type="button"
                className={`acx-figure ${item.className} ${activeFigure === item.key ? "is-active" : ""}`}
                onClick={() => handleFigureAction(item.key)}
                aria-label={item.label}
              >
                <Icon sx={{ fontSize: 18 }} />
                <span>{item.label}</span>
              </Box>
            );
          })}
        </Box>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ minHeight: { md: 470 } }}>
          <Box
            component="img"
            src={buildPoster(featuredMovie.poster_path, featuredMovie.title)}
            alt={featuredMovie.title}
            sx={{
              width: { xs: "100%", md: 350 },
              maxHeight: { xs: 420, md: "unset" },
              objectFit: "cover",
              borderRight: { md: "1px solid rgba(255,255,255,0.12)" },
            }}
          />

          <Box sx={{ p: { xs: 2.2, sm: 2.6, md: 3 }, maxWidth: 760 }}>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2, flexWrap: "wrap" }}>
              <Chip label="TRENDING" size="small" color="secondary" />
              <Typography variant="body2" color="text.secondary">
                {featuredMeta.year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {featuredMeta.language}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                {featuredMeta.rating}
              </Typography>
            </Stack>

            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 0.98, fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" } }}>
              {featuredMovie.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 640 }}>
              {featuredMovie.overview || "Explore this featured title and discover similar movies, cast, reviews and trailer."}
            </Typography>

            <Stack direction="row" spacing={1.4} sx={{ mt: 2.4, flexWrap: "wrap" }}>
              <Button
                component={Link}
                to={`/movies/${featuredMovie.id}`}
                variant="contained"
                color="secondary"
                startIcon={<PlayArrowIcon />}
                sx={{ borderRadius: 2.5, px: 2.6 }}
              >
                Watch Now
              </Button>
              <Button onClick={() => onAddToWatch(featuredMovie)} variant="outlined" startIcon={<BookmarkAddIcon />} sx={{ borderRadius: 2.5, px: 2.6 }}>
                Add to Watchlist
              </Button>
            </Stack>

            {safeFeaturedMovies.length > 1 && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                <Tooltip title="Previous">
                  <IconButton
                    size="small"
                    onClick={() => setHeroIndex((prev) => (prev - 1 + safeFeaturedMovies.length) % safeFeaturedMovies.length)}
                    sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                  >
                    <ChevronLeftIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {safeFeaturedMovies.map((movie, idx) => (
                  <Box
                    key={movie.id}
                    onClick={() => setHeroIndex(idx)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      cursor: "pointer",
                      bgcolor: idx === heroIndex ? "secondary.main" : "rgba(255,255,255,.35)",
                    }}
                  />
                ))}
                <Tooltip title="Next">
                  <IconButton
                    size="small"
                    onClick={() => setHeroIndex((prev) => (prev + 1) % safeFeaturedMovies.length)}
                    sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                  >
                    <ChevronRightIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </Box>
        </Stack>
      </Paper>

      <Box
        className="movie-rows-surface"
        sx={{
          backgroundImage: `linear-gradient(120deg, rgba(14, 18, 32, 0.95), rgba(12, 20, 38, 0.9)), linear-gradient(90deg, rgba(255, 87, 133, 0.08), rgba(91, 122, 255, 0.08)), url(${buildBackdrop(
            featuredMovie.backdrop_path,
            featuredMovie.title
          )})`,
          backgroundSize: "100% 100%, 220% 220%, cover",
          backgroundPosition: "0 0, 0% 50%, center",
        }}
      >
        {sections.map((section) => (
          <MovieRow key={section.title} title={section.title} movies={section.movies} seeAllPath={section.seeAllPath} />
        ))}
      </Box>

      <Snackbar
        open={figureToast.open}
        autoHideDuration={2600}
        onClose={() => setFigureToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setFigureToast((prev) => ({ ...prev, open: false }))}
          action={
            figureToast.movie ? (
              <Button color="inherit" size="small" onClick={() => navigate(`/movies/${figureToast.movie.id}`)}>
                Open
              </Button>
            ) : null
          }
          sx={{ alignItems: "center" }}
        >
          {figureToast.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default StreamingHome;
