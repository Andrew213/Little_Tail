import { ThunkDispatch } from 'redux-thunk';
import { receiveLoginAC, fetchLoginErrorAC } from './action-creators/index';
import { LoginActionType } from './action-types/index';
import { LoginState } from '../LoginState';
import { LoginAction } from '../interfaces';
import { Dispatch } from 'redux';
import { RootState } from '@/store';

export const checkSession = () => {
    return (dispatch: Dispatch<LoginAction>) => {
        dispatch({
            type: LoginActionType.INIT_SESSION,
        });

        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            const user = localStorage.getItem('user');

            dispatch({
                type: LoginActionType.INIT_SESSION_SUCCESS,
                user: JSON.parse(user),
            });
        } else {
            dispatch({
                type: LoginActionType.INIT_SESSION_ERROR,
            });
        }
    };
};

export const getAuth = (login: string, password: string | number) => {
    return async (dispatch: ThunkDispatch<LoginState, void, LoginAction>, getState: () => RootState) => {
        dispatch({
            type: LoginActionType.REQUEST_LOGIN,
        });

        const {
            Session: { session },
        } = getState();

        if (!session) {
            try {
                const res = await fetch('https://acits-test-back.herokuapp.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ login, password }),
                });

                const session = await res.json();

                localStorage.setItem('access_token', `${session.accessToken}`);
                localStorage.setItem('user', JSON.stringify(session.user));

                setTimeout(() => localStorage.clear(), 600000);

                dispatch(checkSession());
                dispatch(receiveLoginAC());
            } catch (err) {
                console.log(err);
            }
        }
    };
};
