import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/Home";
import { AppMenu } from "./components/Menu";
import { AllAnimals } from './components/Animals/AnimalsGetAll';
import { AnimalDetails } from './components/Animals/AnimalsDetails';
import { AnimalAdd } from './components/Animals/AnimalsAdd';
import { AnimalDelete } from './components/Animals/AnimalsDelete';
import { UpdateAnimal } from './components/Animals/AnimalsUpdate';
import { AnimalFilter } from './components/Animals/AnimalsFilter';

function App() {
  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/animals" element={<AllAnimals />} />
					<Route path="/animals/:animalId/details" element={<AnimalDetails />} />
					<Route path="/animals/:animalId/edit" element={<UpdateAnimal />} />
					<Route path="/animals/:animalId/delete" element={<AnimalDelete />} />
					<Route path="/animals/add" element={<AnimalAdd />} /> 
					<Route path="/animals-ordered-by-age" element={<AnimalFilter />} />
				</Routes>
			</Router> 
		</React.Fragment>
	);
}

export default App;