import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import {useParams} from "react-router-dom";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";

const UpcomingMoviesPage = (props) => {

    const { page } = useParams();
    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }
    const {  data, error, isLoading, isError }  = useQuery(['upcoming', { pageNumber }], getUpcomingMovies)
    usePrefetchPageQueries({ baseKey: "upcoming", pageNumber, fetcher: getUpcomingMovies });

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const upcomingMovies = data.results;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={upcomingMovies}
            pagination={true}
            page={pageNumber}
            location={"/movies/upcoming"}
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
export default UpcomingMoviesPage;
