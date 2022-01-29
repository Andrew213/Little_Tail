import { LoginActionType } from '../action/action-types';
import { LoginAction } from '../interfaces';
import { LoginState } from '../LoginState';

const initialState: LoginState = {
    session: false,
    access_token: '',
    isLoading: false,
    errMsg: '',
    user: null,
};

export const LoginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginActionType.REQUEST_LOGIN:
            return { ...state, isLoading: true };
        case LoginActionType.RECEIVE_LOGIN:
            return {
                ...state,
                isLoading: false,
                access_token: action.access_token,
                session: true,
                user: action.user,
            };
        case LoginActionType.FETCH_LOGIN_ERROR:
            return { ...state, errMsg: action.errMsg, session: false, isLoading: false };
        case LoginActionType.INIT_SESSION:
            return state;
        default:
            return state;
    }
};
