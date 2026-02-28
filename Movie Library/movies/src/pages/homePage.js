import React, { useContext } from "react";
import { useQueries, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getClassicMovies,
  getMovies,
  getMoviesByLanguage,
  getNewMovies,
  getPlayingMovies,
  getTrendingTodayMovies,
  getUpcomingMovies,
} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";
import StreamingHome from "../components/streamingHome";
import { MoviesContext } from "../contexts/moviesContext";
import SiteFooter from "../components/siteFooter";

const mergeUniqueById = (...groups) => {
  const map = new Map();
  groups.flat().forEach((movie) => {
    if (movie && !map.has(movie.id)) map.set(movie.id, movie);
  });
  return [...map.values()];
};

const HomePage = () => {
  const { page } = useParams();
  const { addToWatch } = useContext(MoviesContext);

  // Keep paginated discover route behavior for /movies/discover/page/:page
  const pageNumber = Number(page) || 1;
  const isDiscoverPaging = Boolean(page) && pageNumber > 1;

  const discoverQuery = useQuery(["discover", { pageNumber }], getMovies, {
    enabled: isDiscoverPaging,
  });
  usePrefetchPageQueries({
    baseKey: "discover",
    pageNumber,
    fetcher: getMovies,
    enabled: isDiscoverPaging,
  });

  const homeQueries = useQueries([
    { queryKey: ["discover", { pageNumber: 1 }], queryFn: getMovies, enabled: !isDiscoverPaging },
    { queryKey: ["discover", { pageNumber: 2 }], queryFn: getMovies, enabled: !isDiscoverPaging },
    {
      queryKey: ["trendingToday", { pageNumber: 1 }],
      queryFn: getTrendingTodayMovies,
      enabled: !isDiscoverPaging,
    },
    {
      queryKey: ["trendingToday", { pageNumber: 2 }],
      queryFn: getTrendingTodayMovies,
      enabled: !isDiscoverPaging,
    },
    { queryKey: ["upcoming", { pageNumber: 1 }], queryFn: getUpcomingMovies, enabled: !isDiscoverPaging },
    { queryKey: ["upcoming", { pageNumber: 2 }], queryFn: getUpcomingMovies, enabled: !isDiscoverPaging },
    { queryKey: ["playing", { pageNumber: 1 }], queryFn: getPlayingMovies, enabled: !isDiscoverPaging },
    { queryKey: ["playing", { pageNumber: 2 }], queryFn: getPlayingMovies, enabled: !isDiscoverPaging },
    { queryKey: ["classic", { pageNumber: 1 }], queryFn: getClassicMovies, enabled: !isDiscoverPaging },
    { queryKey: ["classic", { pageNumber: 2 }], queryFn: getClassicMovies, enabled: !isDiscoverPaging },
    { queryKey: ["new", { pageNumber: 1 }], queryFn: getNewMovies, enabled: !isDiscoverPaging },
    { queryKey: ["new", { pageNumber: 2 }], queryFn: getNewMovies, enabled: !isDiscoverPaging },
    {
      queryKey: ["languageMovies", { language: "en" }, { pageNumber: 1 }],
      queryFn: getMoviesByLanguage,
      enabled: !isDiscoverPaging,
    },
    {
      queryKey: ["languageMovies", { language: "hi" }, { pageNumber: 1 }],
      queryFn: getMoviesByLanguage,
      enabled: !isDiscoverPaging,
    },
    {
      queryKey: ["languageMovies", { language: "te" }, { pageNumber: 1 }],
      queryFn: getMoviesByLanguage,
      enabled: !isDiscoverPaging,
    },
    {
      queryKey: ["languageMovies", { language: "ml" }, { pageNumber: 1 }],
      queryFn: getMoviesByLanguage,
      enabled: !isDiscoverPaging,
    },
  ]);

  if (isDiscoverPaging) {
    if (discoverQuery.isLoading) return <Spinner />;
    if (discoverQuery.isError) return <h1>{discoverQuery.error.message}</h1>;

    const movies = discoverQuery.data.results;
    return (
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        pagination
        page={pageNumber}
        location="/movies/discover"
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchIcon movie={movie} />
            <WriteReviewIcon movie={movie} />
          </>
        )}
      />
    );
  }

  const isLoading = homeQueries.some((q) => q.isLoading);
  const isError = homeQueries.find((q) => q.isError);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{isError.error.message}</h1>;

  const [
    discoverP1,
    discoverP2,
    trendingP1,
    trendingP2,
    upcomingP1,
    upcomingP2,
    playingP1,
    playingP2,
    classicP1,
    classicP2,
    newP1,
    newP2,
    englishP1,
    hindiP1,
    teluguP1,
    malayalamP1,
  ] = homeQueries.map((q) => q.data.results || []);

  const discover = mergeUniqueById(discoverP1, discoverP2);
  const trending = mergeUniqueById(trendingP1, trendingP2);
  const upcoming = mergeUniqueById(upcomingP1, upcomingP2);
  const playing = mergeUniqueById(playingP1, playingP2);
  const classics = mergeUniqueById(classicP1, classicP2);
  const newMovies = mergeUniqueById(newP1, newP2);
  const englishMovies = mergeUniqueById(englishP1);
  const hindiMovies = mergeUniqueById(hindiP1);
  const teluguMovies = mergeUniqueById(teluguP1);
  const malayalamMovies = mergeUniqueById(malayalamP1);

  const featuredMovies = mergeUniqueById(trending, newMovies, discover, playing)
    .filter((m) => m.backdrop_path)
    .slice(0, 8);

  const sections = [
    { title: "Trending Now", movies: trending.slice(0, 20), seeAllPath: "/movies/trending/today" },
    { title: "New This Year", movies: newMovies.slice(0, 20), seeAllPath: "/movies/discover/page/1" },
    { title: "Latest Discoveries", movies: discover.slice(0, 20), seeAllPath: "/movies/discover/page/1" },
    { title: "Coming Soon", movies: upcoming.slice(0, 20), seeAllPath: "/movies/upcoming" },
    { title: "Now Playing", movies: playing.slice(0, 20), seeAllPath: "/movies/playing" },
    { title: "Old Classics", movies: classics.slice(0, 20), seeAllPath: "/movies/discover/page/1" },
    { title: "English Movies", movies: englishMovies.slice(0, 20), seeAllPath: "/movies/language/en" },
    { title: "Hindi Movies", movies: hindiMovies.slice(0, 20), seeAllPath: "/movies/language/hi" },
    { title: "Telugu Movies", movies: teluguMovies.slice(0, 20), seeAllPath: "/movies/language/te" },
    { title: "Malayalam Movies", movies: malayalamMovies.slice(0, 20), seeAllPath: "/movies/language/ml" },
  ];

  return (
    <>
      <StreamingHome featuredMovies={featuredMovies} sections={sections} onAddToWatch={addToWatch} />
      <SiteFooter />
    </>
  );
};

export default HomePage;
