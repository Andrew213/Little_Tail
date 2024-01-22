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
                `https://littletail.onrender.com/api/pets?limit=5&pageNumber=${props.pageNumber}&allData=${props.allData}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const { pets, total } = await res.json();

            if (pets) {
                dispatch(receivePetsAC(pets as PetT[], total as number));
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

export const postAnimal = (props: PetT) => {
    return async () => {
        try {
            const accessToken = localStorage.getItem('access_token');

            const response = await fetch('https://littletail.onrender.com/api/pets', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props),
            }).then(res => res.json());

            return response;
        } catch (error) {
            return error;
        }
    };
};

export const deleteAnimal = (id: string) => {
    return async () => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await fetch('https://littletail.onrender.com/api/pets', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.status === 200) {
                return true;
            }

            return false;
        } catch (error) {
            return error;
        }
    };
};
