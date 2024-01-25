import { PetsActionType } from '../actions/action-types';
import { PetsAction } from '../interfaces';
import { PetsState } from '../PetsState';

const initialState: PetsState = {
    petsListing: [],
    isLoading: true,
    errMessage: '',
    total: 0,
};

export const PetsReducer = (state: PetsState = initialState, action: PetsAction): PetsState => {
    switch (action.type) {
        case PetsActionType.REQUEST_PETS:
            return { ...state, isLoading: true };
        case PetsActionType.RECEIVE_PETS:
            return { ...state, isLoading: false, petsListing: action.petsListing, total: action.total };
        case PetsActionType.FETCH_PETS_ERROR:
            return { ...state, isLoading: false, errMessage: action.errMsg };
        default:
            return state;
    }
};
