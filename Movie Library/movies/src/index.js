import React from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingTodayMoviesPage from "./pages/trendingTodayMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PlayingMoviesPage from "./pages/playingMoviesPage";
import WatchListMoviesPage from "./pages/watchListMoviesPage";
import SimilarMoviesPage from "./pages/similarMoviesPage";
import LatestMoviePage from "./pages/latestMovieDetailsPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import PopularPeoplePage from "./pages/popularPeoplePage";
import PersonPage from "./pages/personDetailsPage";
import MovieCreditsForPersonPage from "./pages/movieCreditsForPersonPage";
import MovieSearchPage from "./pages/movieSearchPage";
import SearchResultMoviesPage from "./pages/searchResultMoviesPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});


const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SiteHeader />
                <MoviesContextProvider>
                    <Routes>
                        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />

                        <Route path="/movies/discover/page/:page" element={<HomePage />} />
                        <Route path="/movies/discover" element={<HomePage />} />
                        <Route path="/movies/search" element={<MovieSearchPage />} />
                        <Route path="/movies/search/:title" element={<SearchResultMoviesPage />} />
                        <Route path="/movies/search/:title/page/:page" element={<SearchResultMoviesPage />} />
                        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                        <Route path="/movies/watchlist" element={<WatchListMoviesPage />} />
                        <Route path="/movies/upcoming/page/:page" element={<UpcomingMoviesPage />} />
                        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                        <Route path="/movies/trending/today/page/:page" element={<TrendingTodayMoviesPage />} />
                        <Route path="/movies/trending/today" element={<TrendingTodayMoviesPage />} />
                        <Route path="/movies/playing/page/:page" element={<PlayingMoviesPage />} />
                        <Route path="/movies/playing" element={<PlayingMoviesPage />} />
                        <Route path="/movies/latest" element={<LatestMoviePage />} />
                        <Route path="/movies/:id/similar" element={ <SimilarMoviesPage /> } />
                        <Route path="/movies/:id/credits" element={ <MovieCreditsPage /> } />
                        <Route path="/movies/:id" element={<MoviePage />} />

                        <Route path="/similar" element={ <SimilarMoviesPage /> } />
                        <Route path="/similar/:id" element={ <SimilarMoviesPage /> } />

                        <Route path="/people/popular/page/:page" element={<PopularPeoplePage />} />
                        <Route path="/people/popular" element={<PopularPeoplePage />} />
                        <Route path="/people/:id" element={<PersonPage />} />
                        <Route path="/people/:id/credits/movie" element={<MovieCreditsForPersonPage />} />

                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={ <Navigate to="/" /> } />
                    </Routes>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
