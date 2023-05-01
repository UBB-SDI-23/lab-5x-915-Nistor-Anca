import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, Toolbar, colors } from "@mui/material";
import axios, { toFormData } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Animal } from "../../models/Animal";
import { useCallback, useEffect, useRef, useState } from "react";
import { Specie } from "../../models/Specie";
import { debounce } from "lodash";


export const UpdateAnimal = () => {
    const { animalId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [species, setSpecies] = useState<Specie[]>([]);

    const [animal, setAnimal] = useState<Animal>({
        created: new Date(),
        id: parseInt(String(animalId)),
        name: "",
        gender: "",
        birth_date: new Date(),
        kilograms: 0,
        favourite_toy: "",
        specie_id: 1,
    });

    const specie = useRef<Specie>({
        created: new Date(),
        name: "",
        specifications: "",
        endangered:"",
        years_expected_to_live: 0,
        food_type: "",
    })

    const updateAnimal = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
          const isoDateString = animal.birth_date.toISOString();
          const dateString = isoDateString.substr(0, 10);
          const animalToAdd = {
            ...animal,
            birth_date: dateString,
          };
          await axios.put(`${BACKEND_API_URL}/animals/${animalId}/`, animalToAdd);
          navigate("/animals");
        } catch (error) {
          console.log(error);
        }
      };
      

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/animals");
    };



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

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
        if (event.target.id === "birth_date") {
			const isoDateString = new Date(event.target.value).toISOString();
			const dateString = isoDateString.substr(0, 10);
			const date = new Date(dateString);
			setAnimal({ ...animal, birth_date: date });
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
                    <form onSubmit={updateAnimal} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="name"
                                variant="outlined"
                                onChange={(event) => setAnimal({ ...animal, name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Gender
                            </FormLabel>
                            <TextField
                                id="gender"
                                variant="outlined"
                                // generate the same code for onChange, but can you convert the string to int?
                                onChange={(event) => setAnimal({ ...animal, gender: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Birth date
                            </FormLabel>
                            <TextField
                                id="birth_date"
                                variant="outlined"
                                type="date"
                                onChange={(event) => setAnimal({ ...animal, birth_date: new Date(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Kilograms
                            </FormLabel>
                            <TextField
                                id="kilograms"
                                variant="outlined"
                                onChange={(event) => setAnimal({ ...animal, kilograms: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Favourite toy
                            </FormLabel>
                            <TextField
                                id="favourite_toy"
                                variant="outlined"
                                onChange={(event) => setAnimal({ ...animal, favourite_toy: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Specie
                            </FormLabel>
                            <Autocomplete
                                id="specie_id"
                                options={species}
                                getOptionLabel={(option) => `${option.name}`}
							    renderInput={(params) => <TextField {...params} label="Specie" variant="outlined" />}
                                value={specie.current}
							    filterOptions={(x) => x}
							    onInputChange={handleInputChange}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        setAnimal({ ...animal, specie_id: value.id });
                                    }
                                }}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateAnimal} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}