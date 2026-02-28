import React, { useContext } from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { buildFallbackReviews, excerpt } from "../../util";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieReviews({ movie }) {
    const { getReviewsForMovie } = useContext(MoviesContext);
    const { data , error, isLoading, isError } = useQuery(
        ["reviews", { id: movie.id }],
        getMovieReviews
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const tmdbReviews = data.results || [];
    const audiencePulse = buildFallbackReviews(movie);
    const existingReviews = tmdbReviews.length ? [...audiencePulse, ...tmdbReviews] : audiencePulse;
    const userReviews = getReviewsForMovie(movie.id);

    return (
        <Box sx={{ display: "grid", gap: 2 }}>
            <Paper sx={{ p: 1.4, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    Your Reviews
                </Typography>
                {!userReviews.length ? (
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                        You have not added a review for this movie yet.
                    </Alert>
                ) : (
                    <TableContainer>
                        <Table sx={{minWidth: 550}} aria-label="your reviews table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Author</TableCell>
                                    <TableCell align="center">Your Excerpt</TableCell>
                                    <TableCell align="right">More</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userReviews.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell component="th" scope="row">
                                            {r.author}
                                        </TableCell>
                                        <TableCell>{excerpt(r.content)}</TableCell>
                                        <TableCell>
                                            <Link
                                                to={`/reviews/${r.id}`}
                                                state={{
                                                    review: r,
                                                    movie: movie,
                                                }}
                                            >
                                                Full Review
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <TableContainer component={Paper}>
                <Typography variant="h6" sx={{ p: 1.4, pb: 0.6, fontWeight: 700 }}>
                    Existing Reviews (TMDB + Audience Pulse)
                </Typography>
                <Table sx={{minWidth: 550}} aria-label="existing reviews table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Author</TableCell>
                            <TableCell align="center">Excerpt</TableCell>
                            <TableCell align="right">More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {existingReviews.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell component="th" scope="row">
                                    {r.author}
                                </TableCell>
                                <TableCell >{excerpt(r.content)}</TableCell>
                                <TableCell >
                                    <Link
                                        to={`/reviews/${r.id}`}
                                        state={{
                                            review: r,
                                            movie: movie,
                                        }}
                                    >
                                        Full Review
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
