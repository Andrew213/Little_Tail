import { ThunkDispatch } from 'redux-thunk';
import { TherapyState } from '../TherapyState';
import { TherapiesActionTypes } from './action-types';
import { TherapyAction } from '../interfaces';

export const getTherapiesList = () => {
    return async (dispatch: ThunkDispatch<TherapyState, void, TherapyAction>) => {
        dispatch({
            type: TherapiesActionTypes.REQUEST_THERAPIES,
        });

        try {
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                const res = await fetch(`http://localhost:5000/api/therapy`, {
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                const therapiesList = await res.json();

                dispatch({
                    type: TherapiesActionTypes.RECEIVE_THERAPIES,
                    therapiesList,
                });
            } else {
                dispatch({
                    type: TherapiesActionTypes.FETCH_THERAPIES_ERROR,
                    errMsg: 'no auth',
                });
            }
        } catch (error) {
            console.log(`error `, error);
            dispatch({
                type: TherapiesActionTypes.FETCH_THERAPIES_ERROR,
                errMsg: error,
            });
        }
    };
};
