import { TodayActionTypes } from '../actions/action-types';
import { getTodayAction } from '../interfaces';
import { TodayState } from '../TodayState';

const InitialState: TodayState = {
    isLoading: true,
    errMsg: '',
    todayListing: [],
    createLoading: false,
    createErrorMsg: '',
    createSuccessMsg: '',
};

export const TodayReducer = (state: TodayState = InitialState, action: getTodayAction): TodayState => {
    switch (action.type) {
        case TodayActionTypes.REQUEST_TODAY:
            return { ...state, isLoading: true };

        case TodayActionTypes.RECEIVE_TODAY:
            return { ...state, isLoading: false, todayListing: action.todayList };

        case TodayActionTypes.FETCH_TODAY_ERROR:
            return { ...state, isLoading: false, errMsg: action.errMsg };
        case TodayActionTypes.FETCH_CREATE_TODAY_ERROR:
            return { ...state, errMsg: action.errMsg, createLoading: action.isLoading };
        case TodayActionTypes.REQUEST_CREATE_TODAY:
            return { ...state, createLoading: true };
        default:
            return state;
    }
};
