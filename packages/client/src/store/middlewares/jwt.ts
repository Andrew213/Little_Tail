import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '..';
import { LoginActionType } from '../Login/action/action-types';

interface jwtProps {
    dispatch: ThunkDispatch<RootState, void, Action>;
    getState: () => RootState;
}

export const jwt = ({ dispatch, getState }: jwtProps) => {
    return (next: ThunkDispatch<RootState, void, Action>) => action => {
        if (typeof action === 'function') {
            const access_token = localStorage.getItem('access_token');
            if (getState().Session && access_token) {
                const tokenExpiration = jwtDecode(access_token).exp;

                console.log(`token will expred: `, tokenExpiration - Math.floor(Date.now() / 1000));
                if (tokenExpiration - Math.floor(Date.now() / 1000) < 10) {
                    localStorage.clear();
                    return next({
                        type: LoginActionType.INIT_SESSION_ERROR,
                        errMsg: 'token expired',
                    });
                }
            }
        }
        return next(action);
    };
};
