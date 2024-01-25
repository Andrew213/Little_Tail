import { PetT } from '@/types/PetType';
import { fetchPetsErrorI, receivePetsI } from '../../interfaces';
import { PetsActionType } from '../action-types';

export const receivePetsAC = (petsListing: PetT[], total: number): receivePetsI => {
    return {
        type: PetsActionType.RECEIVE_PETS,
        petsListing,
        total,
    };
};

export const fetchPetsErrAC = (errMsg: string): fetchPetsErrorI => {
    return {
        type: PetsActionType.FETCH_PETS_ERROR,
        errMsg,
    };
};
