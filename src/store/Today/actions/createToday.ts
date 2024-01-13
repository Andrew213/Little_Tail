import { ThunkDispatch } from 'redux-thunk';
import { getTodayAction } from '../interfaces';
import { TodayState } from '../TodayState';
import { TodayActionTypes } from './action-types';
import { PetT } from '@/types/PetType';
import { TherapyT } from '@/types/Therapy';

type TODAY_POST_DATA = {
    pet: PetT;
    therapy: TherapyT;
    dateTime: number;
};

export const createToday = (data: TODAY_POST_DATA) => {
    return async (dispatch: ThunkDispatch<TodayState, void, getTodayAction>) => {
        dispatch({
            type: TodayActionTypes.REQUEST_CREATE_TODAY,
            isLoading: false,
        });

        const accessToken = localStorage.getItem('access_token');

        try {
            const res = await fetch('https://littletail.onrender.com/api/today', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, dateTime: Math.floor(new Date(data.dateTime).getTime() / 1000) }),
            });

            dispatch({
                type: TodayActionTypes.RECEIVE_CREATE_TODAY,
                isLoading: false,
                successMsg: 'success',
            });

            return await res.json();
        } catch (err) {
            dispatch({ type: TodayActionTypes.FETCH_CREATE_TODAY_ERROR, isLoading: false, errMsg: err });
        }
    };
};
