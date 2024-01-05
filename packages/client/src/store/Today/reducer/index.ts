import { TodayActionTypes } from '../actions/action-types';
import { getTodayAction } from '../interfaces';
import { TodayState } from '../TodayState';

const InitialState: TodayState = {
    isLoading: false,
    errMsg: '',
    todayListing: [],
};

export const TodayReducer = (state: TodayState = InitialState, action: getTodayAction): TodayState => {
    switch (action.type) {
        case TodayActionTypes.REQUEST_TODAY:
            return { ...state, isLoading: true };

        case TodayActionTypes.RECEIVE_TODAY:
            return { ...state, isLoading: false, todayListing: action.todayList };

        case TodayActionTypes.FETCH_TODAY_ERROR:
            return { ...state, isLoading: false, errMsg: action.errMsg };
        default:
            return state;
    }
};
