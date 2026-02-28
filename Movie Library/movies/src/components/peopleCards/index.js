import React from "react";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const PeopleCards = (props) => {
    let peopleCards = props.people.map((p, index) => (

        <Grid key={p.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4}}>
            <Card className="fade-in" sx={{height: "100%", animationDelay: `${Math.min(index * 65, 520)}ms`}}>
                <CardMedia
                    component="img"
                    height="300"
                    image={p.profile_path ? `https://image.tmdb.org/t/p/w300${p.profile_path}` : "https://via.placeholder.com/300x450?text=No+Photo"}
                    alt={`${p.name}'s profile picture`}
                    loading="lazy"
                />
                <CardContent>
                    <Typography variant="h6" sx={{fontWeight: 700}}>
                        <Link to={`/people/${p.id}`}>{p.name}</Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Department: {p.known_for_department}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Popularity: {p.popularity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Gender: {p.gender === 1 ? "Female" : p.gender === 2 ? "Male" : "Not specified"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Adult/Minor: {p.adult ? "Minor" : "Adult"}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ));
    return peopleCards;
};

export default PeopleCards;
