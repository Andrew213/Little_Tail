import { LoginActionType } from '../action/action-types';
import { LoginAction } from '../interfaces';
import { LoginState, SessionState } from '../LoginState';

const LoginState: LoginState = {
    access_token: '',
    isLoading: false,
    errMsg: '',
};

const SessionState: SessionState = {
    session: false,
    user: null,
    errMsg: '',
};

export const LoginReducer = (state: LoginState = LoginState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginActionType.REQUEST_LOGIN:
            return { ...state, isLoading: true };
        case LoginActionType.RECEIVE_LOGIN:
            return {
                ...state,
                isLoading: false,
                // access_token: action.access_token,
            };
        case LoginActionType.FETCH_LOGIN_ERROR:
            return { ...state, errMsg: action.errMsg, isLoading: false };

        default:
            return state;
    }
};

export const CheckSessionReducer = (state: SessionState = SessionState, action: LoginAction) => {
    switch (action.type) {
        case LoginActionType.INIT_SESSION:
            return { ...state, isLoading: true };
        case LoginActionType.INIT_SESSION_SUCCESS:
            return { ...state, session: true, user: action.user };
        case LoginActionType.INIT_SESSION_ERROR:
            return { ...state, session: false, errMsg: action.errMsg };
        default:
            return state;
    }
};
