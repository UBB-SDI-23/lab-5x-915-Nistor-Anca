import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Animal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const AnimalDetails = () => {
	const { animalId } = useParams();
	const [animal, setAnimal] = useState<Animal>();

	useEffect(() => {
		const fetchAnimal = async () => {
			const response = await fetch(`${BACKEND_API_URL}/animals/${animalId}`);
			const animal = await response.json();
			setAnimal(animal);
		};
		fetchAnimal();
	}, [animalId]);


	console.log(animal?.specie);

	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/animals`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Animal Details</h1>
					<p>Animal Name: {employee?.first_name}</p>
					<p>Animal Birth Date: {animal?.birth_date.toString()}</p>
					<p>Animal Gender: {animal?.gender}</p>
					<p>Animal Kilograms: {animal?.kilograms}</p>
					<p>Animal Favourite Toy: {animal?.favourite_toy}</p>
					<p>Specie: {animal?.specie?.name}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/animals/${animalId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/animals/${animalId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};