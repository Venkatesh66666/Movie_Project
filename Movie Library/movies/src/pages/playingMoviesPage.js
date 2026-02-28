import React from "react";
import {getPlayingMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import WriteReviewIcon from "../components/cardIcons/writeReview";
import {useParams} from "react-router-dom";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";

const PlayingMoviesPage = (props) => {

    const { page } = useParams();
    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }
    const {  data, error, isLoading, isError }  = useQuery(['playing', { pageNumber }], getPlayingMovies)
    usePrefetchPageQueries({ baseKey: "playing", pageNumber, fetcher: getPlayingMovies });

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const playingMovies = data.results;

    return (
        <PageTemplate
            title="Movies Now Playing"
            movies={playingMovies}
            pagination={true}
            page={pageNumber}
            location={"/movies/playing"}
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
export default PlayingMoviesPage;
