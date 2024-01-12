import { TherapyState } from '../TherapyState';
import { TherapiesActionTypes } from '../actions/action-types';
import { TherapyAction } from '../interfaces';

const initialState: TherapyState = {
    isLoading: false,
    therapiesList: [],
};

export const TherapyReducer = (state: TherapyState = initialState, action: TherapyAction): TherapyState => {
    switch (action.type) {
        case TherapiesActionTypes.REQUEST_THERAPIES:
            return { ...state, isLoading: true };
        case TherapiesActionTypes.RECEIVE_THERAPIES:
            return { ...state, isLoading: false, therapiesList: action.therapiesList };
        default:
            return state;
    }
};
