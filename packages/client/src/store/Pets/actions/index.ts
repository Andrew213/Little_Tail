import { RootState } from '@/store';
import { LoginActionType } from '@/store/Login/action/action-types';
import { LoginAction } from '@/store/Login/interfaces';
import { PetT } from '@/types/PetType';
import { ThunkDispatch } from 'redux-thunk';
import { PetsAction } from '../interfaces';
import { PetsState } from '../PetsState';
import { receivePetsAC, fetchPetsErrAC } from './action-creators';
import { PetsActionType } from './action-types';

export const getAnimals = (accessToken?: string, pageNumber?: number) => {
    return async (dispatch: ThunkDispatch<PetsState, void, PetsAction | LoginAction>, getState: () => RootState) => {
        dispatch({
            type: PetsActionType.REQUEST_PETS,
        });

        try {
            const res = await fetch(
                `https://acits-test-back.herokuapp.com/api/animals?limit=5&offset=${pageNumber * 5}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                    },
                }
            );

            const petsList = await res.json();
            if (petsList.results) {
                dispatch(receivePetsAC(petsList.results as PetT[]));
            } else {
                dispatch({ type: LoginActionType.INIT_SESSION_ERROR, errMsg: 'Истекло время токена' });
            }
        } catch (err) {
            console.log(`petsErr`, err);
        }
    };
};
