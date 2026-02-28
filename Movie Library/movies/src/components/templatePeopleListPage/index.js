import React, { useMemo, useState } from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid2";
import PeopleList from "../peopleList";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { ToggleButton, ToggleButtonGroup, Stack, Typography, IconButton } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import PeopleCards from "../peopleCards";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PeopleListPageTemplate({ people, title, pagination, page, location }) {
  const currentPage = Number(page) || 1;
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const initialView = queryParams.get("view") || "table";
  const [view, setView] = useState(initialView);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  const sortedPeople = useMemo(() => {
    const copied = [...people];
    if (!sortConfig.key) return copied;

    copied.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
    return copied;
  }, [people, sortConfig]);

  const queryString = `?view=${view}`;

  const handleViewChange = (_, nextView) => {
    if (!nextView) return;
    setView(nextView);
    navigate(`${location}/page/${currentPage}?view=${nextView}`);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      navigate(`${location}/page/${currentPage - 1}${queryString}`);
    } else if (direction === "next") {
      navigate(`${location}/page/${currentPage + 1}${queryString}`);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const isSameKey = prev.key === key;
      const newDirection = isSameKey && prev.direction === "ascending" ? "descending" : "ascending";
      return { key, direction: newDirection };
    });
  };

  return (
    <Grid container spacing={2.5} className="fade-in">
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid size={12}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          {pagination && (
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" color="text.secondary">
                Page {currentPage}
              </Typography>
              <IconButton onClick={() => handlePageChange("next")} disabled={currentPage === 500}>
                <ArrowForwardIcon />
              </IconButton>
            </Stack>
          )}

          <Stack direction="row" spacing={1.1} alignItems="center">
            <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
              <ToggleButton value="table" aria-label="table">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="cards" aria-label="cards">
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button color="primary" onClick={() => handleSort("name")} size="medium">
              Name <UnfoldMoreIcon fontSize="small" />
            </Button>
            <Button color="secondary" onClick={() => handleSort("popularity")} size="medium">
              Popularity <UnfoldMoreIcon fontSize="small" />
            </Button>
          </Stack>
        </Stack>
      </Grid>

      {view === "table" ? (
        <Grid size={12}>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table aria-label="people table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="right">Popularity</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Adult/Minor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <PeopleList people={sortedPeople} />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        <Grid size={12}>
          <Grid container spacing={2.5}>
            <PeopleCards people={sortedPeople} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default PeopleListPageTemplate;
