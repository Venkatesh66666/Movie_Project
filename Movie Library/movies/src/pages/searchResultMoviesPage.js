import React from "react";
import {searchForMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateSearchPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import {useParams} from "react-router-dom";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";

const SearchResultMoviesPage = ( props ) => {

    const { title, page } = useParams();


    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }

    const { data, error, isLoading, isError } = useQuery(
        ["searchResult", { title }, { pageNumber }],
        searchForMovies
    );
    usePrefetchPageQueries({
        baseKey: "searchResult",
        extraKeyParts: [{ title }],
        pageNumber,
        fetcher: searchForMovies,
        enabled: Boolean(title),
    });


    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const resultMovies = data.results;

    return (
        <PageTemplate
            title="Search Result"
            movies={resultMovies}
            pagination={true}
            page={pageNumber}
            location={`/movies/search/${title}`}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                        <AddToWatchIcon movie={movie} />
                        <WriteReviewIcon movie={movie} />
                    </>
                );
            }}
        />
    );
};
export default SearchResultMoviesPage;
