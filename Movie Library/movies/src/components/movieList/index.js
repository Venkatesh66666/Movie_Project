import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid2";

const MovieList = (props) => {
    return (
        <Grid container spacing={2.5} sx={{ flex: 1 }}>
            {props.movies.map((m, index) => (
                <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}>
                    <Movie movie={m} action={props.action} index={index} />
                </Grid>
            ))}
        </Grid>
    );
};

export default MovieList;
