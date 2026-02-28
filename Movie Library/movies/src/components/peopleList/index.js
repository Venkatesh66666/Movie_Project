import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {Link} from "react-router-dom";

const PeopleList = (props) => {
    //<Person key={m.id} person={m} action={props.action} />
    let list = props.people.map((p) => (
        <TableRow
            key={p.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: "rgba(61, 217, 214, 0.06)" } }}
        >
            <TableCell component="th" scope="row">
                <Link to={`/people/${p.id}`} style={{fontWeight: 700}}>{p.name}</Link>
            </TableCell>
            <TableCell align="right">{p.known_for_department}</TableCell>
            <TableCell align="right">{p.popularity}</TableCell>
            <TableCell align="right">{p.gender === 1 ? "Female" : p.gender === 2 ? "Male" : "Not specified"}</TableCell>
            <TableCell align="right">{p.adult ? "Minor" : "Adult"}</TableCell>
        </TableRow>
    ));
    return list;
};

export default PeopleList;
