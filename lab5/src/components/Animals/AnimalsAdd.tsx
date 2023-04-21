import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Toolbar, debounce } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Animal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AnimalAdd = () => {
	const navigate = useNavigate();

	const [animal, setAnimal] = useState<Animal>({
		name: "",
		birth_date: new Date("2023-04-20T12:00:00Z"),
		kilograms: 0,
		gender: "",
		favourite_toy: "",
	});
 
	const addAnimal = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/animals/`, animal);
			navigate("/animals");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/animals`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<form onSubmit={addAnimal}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAnimal({ ...animal, name: event.target.value })}
						/>
						<TextField
							id="birth_date"
							label="Birth date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAnimal({ ...animal, birth_date: new Date(event.target.value) })}
						/>
						<TextField
							id="kilograms"
							label="Number of kilograms"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAnimal({ ...animal, kilograms: event.target.value })}
						/>
						<TextField
							id="gender"
							label="Gender"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAnimal({ ...animal, gender: event.target.value })}
						/>
						
						<TextField
							id="favourite_toy"
							label="Favourite toy"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAnimal({ ...animal, gender: event.target.value })}
						/>

						{}

						<Button type="submit">Add Animal</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};