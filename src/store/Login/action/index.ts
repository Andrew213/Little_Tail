import { ThunkDispatch } from 'redux-thunk';
import { receiveLoginAC, fetchLoginErrorAC } from './action-creators/index';
import { LoginActionType } from './action-types/index';
import { LoginState } from '../LoginState';
import { LoginAction } from '../interfaces';
import { Dispatch } from 'redux';
import { RootState } from '@/store';
import { userT } from '@/types/userType';

export const checkSession = () => {
    return async (dispatch: Dispatch<LoginAction>) => {
        dispatch({
            type: LoginActionType.INIT_SESSION,
        });

        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            const res = await fetch('https://littletail.onrender.com/api/auth/auth', {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            const response = await res.json();

            if (response.user) {
                dispatch({
                    type: LoginActionType.INIT_SESSION_SUCCESS,
                    user: response.user as userT,
                });
            }
        } else {
            dispatch({
                type: LoginActionType.INIT_SESSION_ERROR,
                errMsg: 'no  auth',
            });
        }
    };
};

export type signInT = {
    login: string;
    password: string;
};

export const getAuth = (data: signInT) => {
    return async (dispatch: ThunkDispatch<LoginState, void, LoginAction>, getState: () => RootState) => {
        dispatch({
            type: LoginActionType.REQUEST_LOGIN,
        });

        const {
            Session: { session },
        } = getState();

        if (!session) {
            try {
                const res = await fetch('https://littletail.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: data.login, password: data.password }),
                });

                if (res?.status === 400) {
                    dispatch({
                        type: LoginActionType.INIT_SESSION_ERROR,
                        errMsg: 'Неверный логин или пароль',
                    });
                    return;
                }

                if (res?.status === 404) {
                    dispatch({
                        type: LoginActionType.INIT_SESSION_ERROR,
                        errMsg: 'Пользователь не найден',
                    });
                    return;
                }

                const session = await res.json();
                localStorage.setItem('access_token', `${session.token}`);
                // dispatch(receiveLoginAC());
                dispatch({
                    type: LoginActionType.INIT_SESSION_SUCCESS,
                    user: session.user,
                });
            } catch (err) {
                dispatch(fetchLoginErrorAC(err as string));
                console.log(err);
            }
        }
    };
};

export type signUpT = {
    login: string;
    password: string | number;
    first_name: string;
    last_name: string;
};

export const signUp = (data: signUpT): any => {
    return async (dispatch: ThunkDispatch<LoginState, void, LoginAction>) => {
        try {
            const response = await fetch('https://littletail.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const session = await response.json();
            localStorage.setItem('access_token', `${session.token}`);
            dispatch({
                type: LoginActionType.INIT_SESSION_SUCCESS,
                user: session.user,
            });
            return session;
        } catch (err) {
            return err;
        }
    };
};
