import { ThunkDispatch } from 'redux-thunk';
import { getTodayAction } from '../interfaces';
import { TodayState } from '../TodayState';
import { TodayActionTypes } from './action-types';

export const getToday = (props?: { pageNumber?: number }) => {
    return async (dispatch: ThunkDispatch<TodayState, void, getTodayAction>) => {
        dispatch({
            type: TodayActionTypes.REQUEST_TODAY,
        });

        const accessToken = localStorage.getItem('access_token');

        try {
            const res = await fetch(`http://localhost:5000/api/today?limit=5&pageNumber=${props.pageNumber}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
            });

            const today = await res.json();
            dispatch({
                type: TodayActionTypes.RECEIVE_TODAY,
                todayList: today,
            });
        } catch (err) {
            dispatch({ type: TodayActionTypes.FETCH_TODAY_ERROR, errMsg: err });
        }
    };
};
