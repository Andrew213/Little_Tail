import { LoginActionType } from '../action/action-types';
import { LoginAction } from '../interfaces';
import { LoginState, SessionState } from '../LoginState';

const LoginState: LoginState = {
    access_token: '',
    loginLoading: false,
    errMsg: '',
};

const SessionState: SessionState = {
    session: false,
    sessionLoading: false,
    user: null,
    errMsg: '',
};

export const LoginReducer = (state: LoginState = LoginState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginActionType.REQUEST_LOGIN:
            return { ...state, loginLoading: true, errMsg: '' };
        case LoginActionType.RECEIVE_LOGIN:
            return {
                ...state,
                loginLoading: false,
                errMsg: '',
            };
        case LoginActionType.FETCH_LOGIN_ERROR:
            return { ...state, errMsg: action.errMsg, loginLoading: false };

        default:
            return state;
    }
};

export const CheckSessionReducer = (state: SessionState = SessionState, action: LoginAction) => {
    switch (action.type) {
        case LoginActionType.INIT_SESSION:
            return { ...state, sessionLoading: true, errMsg: '' };
        case LoginActionType.INIT_SESSION_SUCCESS:
            return { ...state, session: true, sessionLoading: false, user: action.user, errMsg: '' };
        case LoginActionType.INIT_SESSION_ERROR:
            return { ...state, session: false, sessionLoading: false, errMsg: action.errMsg };
        default:
            return state;
    }
};
