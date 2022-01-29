import { ThunkDispatch } from 'redux-thunk';
import { receiveLoginAC, fetchLoginErrorAC } from './action-creators/index';
import { LoginActionType } from './action-types/index';
import { LoginState, userT } from '../LoginState';
import { LoginAction } from '../interfaces';
import { Dispatch } from 'redux';

export const getAuth = (login: string, password: string | number) => {
    return async (dispatch: ThunkDispatch<LoginState, void, LoginAction>) => {
        dispatch({
            type: LoginActionType.REQUEST_LOGIN,
        });

        try {
            const res = await fetch('https://acits-test-back.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            const session = await res.json();
            if (!session.statusCode) {
                dispatch(receiveLoginAC(session.accessToken as string, session.user as userT));
            } else {
                dispatch(fetchLoginErrorAC('Введены не верные данные'));
            }
        } catch (err) {
            // console.log(`err`, err);
        }
        // dispatch(req)
        // await console.log(`login`, login);
        // await console.log(`password`, password);
    };
};

export const initState = () => {
    return (dispatch: Dispatch<LoginAction>) => {
        dispatch({
            type: LoginActionType.INIT_SESSION,
        });
    };
};
