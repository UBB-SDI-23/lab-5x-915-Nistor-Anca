import {Area} from "./Area";
import {Animal} from "./Animal";

export interface Specie{
	id?: number;

	created: Date;
	name: string;
	specifications: string;
	endangered: string;
	years_expected_to_live: number;
	food_type: string;

	area_id?: number
	area?: Area;
	animals?: Animal[];

}