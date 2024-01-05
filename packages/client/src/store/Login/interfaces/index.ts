import { userT } from '@/types/userType';
import { LoginActionType } from '../action/action-types';

export interface requestLoginI {
    type: LoginActionType.REQUEST_LOGIN;
}

export interface INIT_SESSION_I {
    type: LoginActionType.INIT_SESSION;
}
export interface INIT_SESSION_SUCCESS_I {
    type: LoginActionType.INIT_SESSION_SUCCESS;
    user: userT;
}

export interface INIT_SESSION_ERROR_I {
    type: LoginActionType.INIT_SESSION_ERROR;
    errMsg: string;
}

export interface receiveLoginI {
    type: LoginActionType.RECEIVE_LOGIN;
    // access_token: string;
    // user: userT;
}

export interface fetchLoginErrorI {
    type: LoginActionType.FETCH_LOGIN_ERROR;
    errMsg: string;
}

export type LoginAction =
    | requestLoginI
    | receiveLoginI
    | fetchLoginErrorI
    | INIT_SESSION_I
    | INIT_SESSION_SUCCESS_I
    | INIT_SESSION_ERROR_I;
