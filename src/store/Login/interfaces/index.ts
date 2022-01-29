import { LoginActionType } from '../action/action-types';
import { userT } from '../LoginState';

export interface requestLoginI {
    type: LoginActionType.REQUEST_LOGIN;
}

export interface receiveLoginI {
    type: LoginActionType.RECEIVE_LOGIN;
    access_token: string;
    user: userT;
}

export interface fetchLoginErrorI {
    type: LoginActionType.FETCH_LOGIN_ERROR;
    errMsg: string;
}

export interface InitSessionI {
    type: LoginActionType.INIT_SESSION;
}

export type LoginAction = requestLoginI | receiveLoginI | fetchLoginErrorI | InitSessionI;
