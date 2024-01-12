import { LoginActionType } from '@/store/Login/action/action-types';
import { LoginAction } from '@/store/Login/interfaces';
import { PetT } from '@/types/PetType';
import { ThunkDispatch } from 'redux-thunk';
import { PetsAction } from '../interfaces';
import { PetsState } from '../PetsState';
import { receivePetsAC, fetchPetsErrAC } from './action-creators';
import { PetsActionType } from './action-types';

export const getAnimals = (props?: { pageNumber?: number; allData?: 1 | 0 }) => {
    return async (dispatch: ThunkDispatch<PetsState, void, PetsAction | LoginAction>) => {
        dispatch({
            type: PetsActionType.REQUEST_PETS,
        });

        try {
            const accessToken = localStorage.getItem('access_token');

            const res = await fetch(
                `http://localhost:5000/api/pets?limit=5&pageNumber=${props.pageNumber}&allData=${props.allData}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const petsList = await res.json();

            if (petsList) {
                dispatch(receivePetsAC(petsList as PetT[]));
            } else {
                dispatch({ type: LoginActionType.INIT_SESSION_ERROR, errMsg: 'Истекло время токена' });
            }
        } catch (err) {
            console.log(`petsErr`, err);
            dispatch({
                type: PetsActionType.FETCH_PETS_ERROR,
                errMsg: err,
            });
        }
    };
};
