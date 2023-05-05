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
	Button,
	Toolbar,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Animal } from "../../models/Animal";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";


export const AllAnimals = () => {
	const [loading, setLoading] = useState(false);
	const [animals, setAnimals] = useState<Animal[]>([]);
	console.log(animals);
	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/animals`)
			.then((response) => response.json())
			.then((data) => {
				setAnimals(data);
				setLoading(false);
			});
	}, []);

	const orderByKilograms = () => {
		const sorted = [...animals].sort((a, b) => {
			const k1 = a.kilograms;
			const k2 = b.kilograms;
			return k1 - k2;
		});
		setAnimals(sorted);
	}

	return (
		<Container>
			<h1>All animals</h1>

			{loading && <CircularProgress />}
			{!loading && animals.length === 0 && <p>No animals found</p>}
			{!loading && (
				<Toolbar>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/animals/add`}>
						<Tooltip title="Add a new animal" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
					<Button
						onClick={orderByKilograms}
					>Order By Kilograms
					</Button>
				</Toolbar>
			)}
			{!loading && animals.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Gender</TableCell>
								<TableCell align="right">Birth date</TableCell>
								<TableCell align="right">Kilograms</TableCell>
								<TableCell align="right">Favourite toy</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{animals.map((animal, index) => (
								<TableRow key={animal.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/animals/${animal.id}/details`} title="View animal details">
											{animal.name}
										</Link>
									</TableCell>
									<TableCell align="right">{animal.name}</TableCell>
									<TableCell align="right">{animal.gender}</TableCell>
									<TableCell align="right">{animal.birth_date.toString()}</TableCell>
									<TableCell align="right">{animal.kilograms}</TableCell>
									<TableCell align="right">{animal.favourite_toy}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/animals/${animal.id}/details`}>
											<Tooltip title="View animal details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/animals/${animal.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/animals/${animal.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};