import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";

const RecentMoviesPage = () => {
  const { recentlyViewed: movieIds } = useContext(MoviesContext);

  const recentMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
      staleTime: 1000 * 60 * 20,
    }))
  );

  const isLoading = recentMovieQueries.some((q) => q.isLoading);
  if (isLoading) return <Spinner />;

  const movies = recentMovieQueries
    .filter((q) => q.data)
    .map((q) => {
      const movie = q.data;
      movie.genre_ids = movie.genres?.map((g) => g.id) || [];
      return movie;
    });

  return (
    <PageTemplate
      title="Recently Viewed"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <AddToWatchIcon movie={movie} />
          <WriteReviewIcon movie={movie} />
        </>
      )}
    />
  );
};

export default RecentMoviesPage;
