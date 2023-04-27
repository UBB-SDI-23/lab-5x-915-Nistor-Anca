import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Toolbar} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Animal } from "../../models/Animal";
import { Specie } from "../../models/Specie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {debounce} from "lodash";


export const AnimalAdd = () => {
	const navigate = useNavigate();

	const [animal, setAnimal] = useState<Animal>({
		created: new Date("2023-04-20T12:00:00Z"),
		name: "",
		birth_date: new Date("2023-04-20T12:00:00Z"),
		kilograms: 0,
		gender: "",
		favourite_toy: "",
	});
 

	const [species, setSpecies] = useState<Specie[]>([]);


	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Specie[]>(
				`${BACKEND_API_URL}/species/autocomplete?query=${query}`
			);
			const data = await response.data;
			setSpecies(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);


	const addAnimal = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			console.log(animal);
			await axios.post(`${BACKEND_API_URL}/animals/`, animal);
			navigate("/animals");
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
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
							onChange={(event) => {
								console.log(event.target.value);
								setAnimal({ ...animal, birth_date: new Date(event.target.value) });
							  }}
						/>
						<TextField
							id="kilograms"
							label="Number of kilograms"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAnimal({ ...animal, kilograms: parseInt(event.target.value)})}
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
							onChange={(event) => setAnimal({ ...animal, favourite_toy: event.target.value })}
						/>

						<Autocomplete
							id="specie"
							options={species}
							
							getOptionLabel={(option) => `${option.name}`}
							renderInput={(params) => <TextField {...params} label="Specie" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setAnimal({ ...animal, specie_id: value.id });
								}
							}}
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