import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Route, Navigate, Routes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import HomePage from "./pages/homePage";
import LandingPage from "./pages/landingPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingTodayMoviesPage from "./pages/trendingTodayMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
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
import RecentMoviesPage from "./pages/recentMoviesPage";
import LanguageMoviesPage from "./pages/languageMoviesPage";
import BackToTop from "./components/backToTop";
import theme from "./theme";
import { trackPageView } from "./analytics";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 600000,
            cacheTime: 900000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 1
        },
    },
});

const AppRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        trackPageView(`${location.pathname}${location.search}`);
    }, [location.pathname, location.search]);

    return (
        <Box component="main" className="app-content route-fade" key={location.pathname}>
            <MoviesContextProvider>
                <Routes>
                    <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                    <Route path="/reviews/:id" element={ <MovieReviewPage /> } />

                    <Route path="/movies/discover/page/:page" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/movies/discover" element={<HomePage />} />
                    <Route path="/movies/search" element={<MovieSearchPage />} />
                    <Route path="/movies/search/:title" element={<SearchResultMoviesPage />} />
                    <Route path="/movies/search/:title/page/:page" element={<SearchResultMoviesPage />} />
                    <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                    <Route path="/movies/watchlist" element={<WatchListMoviesPage />} />
                    <Route path="/movies/recent" element={<RecentMoviesPage />} />
                    <Route path="/movies/upcoming/page/:page" element={<UpcomingMoviesPage />} />
                    <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                    <Route path="/movies/language/:lang/page/:page" element={<LanguageMoviesPage />} />
                    <Route path="/movies/language/:lang" element={<LanguageMoviesPage />} />
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

                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={ <Navigate to="/" /> } />
                </Routes>
                <BackToTop />
            </MoviesContextProvider>
        </Box>
    );
};


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Box className="app-shell">
                        <SiteHeader />
                        <AppRoutes />
                    </Box>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
serviceWorkerRegistration.register();
