import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getMoviesByLanguage } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";

const languageMeta = {
  en: { name: "English Movies" },
  hi: { name: "Hindi Movies" },
  te: { name: "Telugu Movies" },
  ml: { name: "Malayalam Movies" },
};

const LanguageMoviesPage = () => {
  const { lang, page } = useParams();
  const selectedLanguage = languageMeta[lang] ? lang : "en";
  const pageNumber = Number(page) || 1;

  const { data, error, isLoading, isError } = useQuery(
    ["languageMovies", { language: selectedLanguage }, { pageNumber }],
    getMoviesByLanguage
  );

  usePrefetchPageQueries({
    baseKey: "languageMovies",
    extraKeyParts: [{ language: selectedLanguage }],
    pageNumber,
    fetcher: getMoviesByLanguage,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results || [];
  const title = languageMeta[selectedLanguage].name;

  return (
    <PageTemplate
      title={title}
      movies={movies}
      pagination
      page={pageNumber}
      location={`/movies/language/${selectedLanguage}`}
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

export default LanguageMoviesPage;
