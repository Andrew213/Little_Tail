import { TodayType } from '@/types/TodayType';
import { ThunkDispatch } from 'redux-thunk';
import { getTodayAction } from '../interfaces';
import { TodayState } from '../TodayState';
import { TodayActionTypes } from './action-types';

export const getToday = () => {
    return async (dispatch: ThunkDispatch<TodayState, void, getTodayAction>) => {
        dispatch({
            type: TodayActionTypes.REQUEST_TODAY,
        });

        const accessToken = localStorage.getItem('access_token');

        try {
            const res = await fetch('https://acits-test-back.herokuapp.com/api/executions/today', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
            });

            const today = await res.json();

            if (today.results) {
                dispatch({
                    type: TodayActionTypes.RECEIVE_TODAY,
                    todayList: today.results,
                });
            } else {
                dispatch({
                    type: TodayActionTypes.FETCH_TODAY_ERROR,
                    errMsg: 'что-то пошло не так',
                });
            }
        } catch (err) {
            dispatch({ type: TodayActionTypes.FETCH_TODAY_ERROR, errMsg: err });
        }
    };
};
