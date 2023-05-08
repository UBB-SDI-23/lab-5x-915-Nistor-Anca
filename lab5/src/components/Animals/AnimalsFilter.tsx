import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL, DEV_BACKEND_API_URL } from "../../constants";
import { Animal } from "../../models/Animal";


export const AnimalFilter= () => {
    const[loading, setLoading] = useState(true)
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/animals/by-age/`)
        .then(res => res.json())
        .then(data => {setAnimals(data); setLoading(false);})
    }, []);

    console.log(animals);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All animals ordered by age.</h1>

        {loading && <CircularProgress />}

        {!loading && animals.length == 0 && <div>No animals found</div>}

        {!loading && animals.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Gender</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Birth date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animals.map((animals:Animal, index) => (
                            <TableRow key={animals.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{animals.name}</TableCell>
                                <TableCell align="center">{animals.gender}</TableCell>
                                <TableCell align="center">{animals.birth_date.toString()}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )
        }
    </Container>
        
    );       
};