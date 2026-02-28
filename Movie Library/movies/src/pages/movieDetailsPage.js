import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { MoviesContext } from "../contexts/moviesContext";
// import useMovie from "../hooks/useMovie";   Redundant

const MoviePage = (props) => {
    const { id } = useParams();
    const { addRecentlyViewed, addViewedMovieInsights } = useContext(MoviesContext);
    //console.log(id)

    /*const movieQuery = (id === "latest") ? useQuery("latestMovie", getLatestMovie) :
        useQuery(["movie", { id: id }], getMovie);

    const { data: movie, error, isLoading, isError } = movieQuery;*/

    /*const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", id],
        id === "latest" ? getLatestMovie : getMovie
    );*/

    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", { id: id }],
        getMovie
    );

    useEffect(() => {
        if (movie) {
            addRecentlyViewed(movie);
            addViewedMovieInsights(movie);
        }
    }, [addRecentlyViewed, addViewedMovieInsights, movie]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie}>
                        <MovieDetails movie={movie} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MoviePage;
