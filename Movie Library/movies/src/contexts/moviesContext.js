import React, { useCallback, useEffect, useMemo, useState } from "react";

export const MoviesContext = React.createContext(null);

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in private mode / quota limits.
  }
};

const MoviesContextProvider = (props) => {
  const [toWatch, setToWatch] = useState(() => readStorage("movieLib.toWatch", []));
  const [favorites, setFavorites] = useState(() => readStorage("movieLib.favorites", []));
  const [myReviews, setMyReviews] = useState(() => readStorage("movieLib.reviews", {}));
  const [recentlyViewed, setRecentlyViewed] = useState(() => readStorage("movieLib.recentlyViewed", []));
  const [searchHistory, setSearchHistory] = useState(() => readStorage("movieLib.searchHistory", []));
  const [genrePreferenceMap, setGenrePreferenceMap] = useState(() => readStorage("movieLib.genrePreferenceMap", {}));

  useEffect(() => writeStorage("movieLib.toWatch", toWatch), [toWatch]);
  useEffect(() => writeStorage("movieLib.favorites", favorites), [favorites]);
  useEffect(() => writeStorage("movieLib.reviews", myReviews), [myReviews]);
  useEffect(() => writeStorage("movieLib.recentlyViewed", recentlyViewed), [recentlyViewed]);
  useEffect(() => writeStorage("movieLib.searchHistory", searchHistory), [searchHistory]);
  useEffect(() => writeStorage("movieLib.genrePreferenceMap", genrePreferenceMap), [genrePreferenceMap]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
  };

  const addToWatch = (movie) => {
    setToWatch((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
  };

  const addRecentlyViewed = (movie) => {
    if (!movie?.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== movie.id);
      return [movie.id, ...filtered].slice(0, 25);
    });
  };

  const addSearchQuery = (query) => {
    const clean = (query || "").trim();
    if (!clean) return;
    setSearchHistory((prev) => [clean, ...prev].slice(0, 60));
  };

  const addViewedMovieInsights = (movie) => {
    if (!movie || !Array.isArray(movie.genres)) return;
    setGenrePreferenceMap((prev) => {
      const next = { ...prev };
      movie.genres.forEach((g) => {
        const key = String(g.id);
        next[key] = (next[key] || 0) + 1;
      });
      return next;
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((mId) => mId !== movie.id));
  };

  const removeFromToWatch = (movie) => {
    setToWatch((prev) => prev.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    if (!movie?.id) return;
    setMyReviews((prev) => {
      const existingRaw = prev[movie.id];
      const existing = Array.isArray(existingRaw) ? existingRaw : existingRaw ? [existingRaw] : [];
      const nextReview = {
        ...review,
        id: review.id || `my-review-${movie.id}-${Date.now()}`,
        createdAt: review.createdAt || new Date().toISOString(),
      };
      return { ...prev, [movie.id]: [nextReview, ...existing] };
    });
  };

  const getReviewsForMovie = useCallback((movieId) => {
    const raw = myReviews[movieId];
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [raw];
  }, [myReviews]);

  const contextValue = useMemo(
    () => ({
      favorites,
      toWatch,
      recentlyViewed,
      searchHistory,
      genrePreferenceMap,
      addToFavorites,
      addToWatch,
      addRecentlyViewed,
      addSearchQuery,
      addViewedMovieInsights,
      removeFromFavorites,
      removeFromToWatch,
      addReview,
      getReviewsForMovie,
      getToWatchList: () => toWatch,
      getFavorites: () => favorites,
    }),
    [favorites, toWatch, recentlyViewed, searchHistory, genrePreferenceMap, getReviewsForMovie]
  );

  return <MoviesContext.Provider value={contextValue}>{props.children}</MoviesContext.Provider>;
};

export default MoviesContextProvider;
