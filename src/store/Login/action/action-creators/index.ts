import { LoginActionType } from '../action-types';
import { fetchLoginErrorI, receiveLoginI } from '../../interfaces';
import { userT } from '../../LoginState';

export const receiveLoginAC = (access_token: string, user: userT): receiveLoginI => {
    return {
        type: LoginActionType.RECEIVE_LOGIN,
        access_token,
        user,
    };
};

export const fetchLoginErrorAC = (errMsg: string): fetchLoginErrorI => {
    return {
        type: LoginActionType.FETCH_LOGIN_ERROR,
        errMsg,
    };
};
