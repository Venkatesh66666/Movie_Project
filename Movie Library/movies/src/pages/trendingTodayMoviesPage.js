import React from "react";
import {getTrendingTodayMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import {useParams} from "react-router-dom";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";

const TrendingTodayMoviesPage = (props) => {

    const { page } = useParams();
    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }
    const {  data, error, isLoading, isError }  = useQuery(['trendingToday', { pageNumber }], getTrendingTodayMovies)
    usePrefetchPageQueries({ baseKey: "trendingToday", pageNumber, fetcher: getTrendingTodayMovies });

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const trendingTodayMovies = data.results;

    return (
        <PageTemplate
            title="Movies Trending Today"
            movies={trendingTodayMovies}
            pagination={true}
            page={pageNumber}
            location={"/movies/trending/today"}
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
export default TrendingTodayMoviesPage;
