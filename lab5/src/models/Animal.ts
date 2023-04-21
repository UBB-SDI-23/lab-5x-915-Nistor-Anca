import {Specie} from "./Specie";

export interface Animal{
	id?: number;

	created: Date;
	name: string;
	birth_date: Date;
	kilograms: number;
	gender: string;
	favourite_toy: string;

	specie_id?: number;
	specie?: Specie;
}