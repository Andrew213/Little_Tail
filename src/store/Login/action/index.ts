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
                const res = await fetch('https://littletail.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: login, password }),
                });

                if (res?.status === 400) {
                    dispatch(fetchLoginErrorAC('Неверный логин или пароль'));
                    dispatch({
                        type: LoginActionType.INIT_SESSION_ERROR,
                        errMsg: 'err',
                    });
                    return;
                }

                if (res?.status === 404) {
                    dispatch(fetchLoginErrorAC('Пользователь не найден'));
                    dispatch({
                        type: LoginActionType.INIT_SESSION_ERROR,
                        errMsg: 'err',
                    });
                    return;
                }

                // if (res.status === 400) {
                //     dispatch(fetchLoginErrorAC('Неверный логин или пароль'));
                //     dispatch({
                //         type: LoginActionType.INIT_SESSION_ERROR,
                //         errMsg: 'err',
                //     });
                // } else {
                const session = await res.json();
                localStorage.setItem('access_token', `${session.token}`);
                // localStorage.setItem('user', JSON.stringify(session.user));
                dispatch(receiveLoginAC());
                dispatch({
                    type: LoginActionType.INIT_SESSION_SUCCESS,
                    user: session.user,
                });
                // }
            } catch (err) {
                dispatch(fetchLoginErrorAC(err as string));
                console.log(err);
            }
        }
    };
};
