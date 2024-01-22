import { PetT } from '@/types/PetType';
import { PetsActionType } from '../actions/action-types';

export interface requestPetsI {
    type: PetsActionType.REQUEST_PETS;
}

export interface receivePetsI {
    type: PetsActionType.RECEIVE_PETS;
    petsListing: PetT[];
    total: number;
}

export interface fetchPetsErrorI {
    type: PetsActionType.FETCH_PETS_ERROR;
    errMsg: string;
}

export type PetsAction = requestPetsI | receivePetsI | fetchPetsErrorI;
