import React from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import {getMovieCredits} from "../../api/tmdb-api";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";

export default function CreditsPage({ movieId }) {
    const { data , error, isLoading, isError } = useQuery(
        ["credits", { id: movieId }],
        getMovieCredits
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const credits = data.cast;

    return (
        <div className="fade-in" style={{padding: "8px"}}>
            <Typography variant="h4" gutterBottom>
                Cast & Credits
            </Typography>
            <Grid container spacing={4}>
                {credits.map((c) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>
                        <Card sx={{width:"100%", display: "flex", flexDirection: "column", borderRadius: 3}}>
                            <CardMedia
                                component="img"
                                height="300"
                                loading="lazy"
                                image={
                                    c.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                                        : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                }
                                alt={c.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    <Link
                                        to={`/people/${c.id}`}
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {c.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {c.character || "Unknown Role"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
