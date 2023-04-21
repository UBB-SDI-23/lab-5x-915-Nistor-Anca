import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, Toolbar, colors } from "@mui/material";
import axios, { toFormData } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Animal } from "../../models/Animal";
import { useEffect, useState } from "react";


export const UpdateAnimal = () => {
    const { animalId } = useParams();
    const navigate = useNavigate();

    const [animal, setAnimal] = useState<Animal>({
        id: parseInt(String(animalId)),
        namea: "",
        gender: "",
        birth_date: new Date("2023-04-20T12:00:00Z"),
        kilograms: 0,
        favourite_toy: "",
    });

    const updateAnimal = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/animals/${animalId}/`, animal);
            navigate("/animals");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/animals");
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
                                // label="First Name"
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

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateEmployee} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}