import { PetT } from './PetType';
import { TherapyT } from './Therapy';

export type TodayType = {
    _id: string;
    dateTime: number;
    therapy: TherapyT;
    pet: PetT;
};
