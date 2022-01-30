import { ThunkDispatch } from 'redux-thunk';
import { PetsAction } from '../interfaces';
import { PetsState } from '../PetsState';
import { receivePetsAC, fetchPetsErrAC } from './action-creators';
import { PetsActionType } from './action-types';

export const getAnimals = (accessToken?: string) => {
    return async (dispatch: ThunkDispatch<PetsState, void, PetsAction>) => {
        dispatch({
            type: PetsActionType.REQUEST_PETS,
        });

        const access_token = localStorage.getItem('access_token');
        const res = await fetch('https://acits-test-back.herokuapp.com/api/animals', {
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
            // body: JSON.stringify({ limit: 5, offset: 5 }),
        });

        const foo = await res.json();

        console.log(`pets`, foo);
    };
};
