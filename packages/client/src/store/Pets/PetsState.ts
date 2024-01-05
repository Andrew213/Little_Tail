import { PetT } from '@/types/PetType';

export interface PetsState {
    petsListing: PetT[];
    isLoading: boolean;
    errMessage: string;
}
