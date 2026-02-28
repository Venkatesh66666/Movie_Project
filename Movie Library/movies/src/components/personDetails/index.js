import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, Button, Box, Chip, Stack } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";

const PersonDetails = ({ person }) => {
  const profileImageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card className="fade-in" sx={{ borderRadius: 4 }}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CardMedia
            component="img"
            image={profileImageUrl}
            alt={`${person.name}'s profile`}
            loading="lazy"
            sx={{ width: "100%", height: { xs: 420, md: "100%" }, objectFit: "cover", borderRadius: { xs: 0, md: "16px 0 0 16px" } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {person.name || "Unknown Person"}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {person.birthday && <Chip label={`Born: ${person.birthday}`} />}
              {person.place_of_birth && <Chip label={`Birthplace: ${person.place_of_birth}`} />}
              {person.deathday && <Chip label={`Died: ${person.deathday}`} />}
            </Stack>

            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {person.biography || "No biography available for this person."}
            </Typography>

            <Box mt={3}>
              <Button component={Link} state={person} to={`/people/${person.id}/credits/movie`} variant="contained" color="primary">
                View Movie Credits
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PersonDetails;
