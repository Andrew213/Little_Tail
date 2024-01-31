import { ThunkDispatch } from 'redux-thunk';
import { getTodayAction } from '../interfaces';
import { TodayState } from '../TodayState';
import { TodayActionTypes } from './action-types';

export const getToday = (props?: { page?: number; query?: string }) => {
    return async (dispatch: ThunkDispatch<TodayState, void, getTodayAction>) => {
        if (!props?.query) {
            dispatch({
                type: TodayActionTypes.REQUEST_TODAY,
            });
        }

        const accessToken = localStorage.getItem('access_token');

        try {
            const url = new URL('https://littletail.onrender.com/api/today');

            if (props?.page) {
                url.searchParams.append('page', `${props.page}`);
            }
            if (props?.query) {
                url.searchParams.append('query', props.query);
            }

            const res = await fetch(url.toString(), {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
            });

            const today = await res.json();

            console.log(`today `, today);
            dispatch({
                type: TodayActionTypes.RECEIVE_TODAY,
                todayList: today.therapiesList,
                total: today.total,
            });
            return res;
        } catch (err) {
            console.log(`err `, err);
            dispatch({ type: TodayActionTypes.FETCH_TODAY_ERROR, errMsg: err });
            return err;
        }
    };
};
