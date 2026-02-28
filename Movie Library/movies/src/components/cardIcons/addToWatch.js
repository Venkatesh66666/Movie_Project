import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToWatch = (e) => {
        e.preventDefault();
        context.addToWatch(movie);
    };
    const handleRemoveFromWatch = (e) => {
        e.preventDefault();
        context.removeFromToWatch(movie);
    };

    if (!context.getToWatchList().includes(movie.id)){
        return (
            <IconButton aria-label="add to watch list" onClick={handleAddToWatch}>
                <PlaylistAddIcon color="primary" fontSize="large" />
            </IconButton>
        );
    }

    return (
        <IconButton aria-label="remove from watch list" onClick={handleRemoveFromWatch}>
            <PlaylistAddCheckIcon color="secondary" fontSize="large" />
        </IconButton>
    );
};

export default AddToWatchIcon;
