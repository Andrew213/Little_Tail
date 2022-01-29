import { fetchPetsErrorI, receivePetsI } from '../../interfaces';
import { PetsActionType } from '../action-types';

export const receivePetsAC = (petsListing: any[]): receivePetsI => {
    return {
        type: PetsActionType.RECEIVE_PETS,
        petsListing,
    };
};

export const fetchPetsErrAC = (errMsg: string): fetchPetsErrorI => {
    return {
        type: PetsActionType.FETCH_PETS_ERROR,
        errMsg,
    };
};
