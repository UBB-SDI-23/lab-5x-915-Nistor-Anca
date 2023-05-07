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
				console.log(data);
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
					
					<Button
						onClick={orderByKilograms}
					>Order By Kilograms
					</Button>
				</Toolbar>
			)}
			
		</Container>
	);
};