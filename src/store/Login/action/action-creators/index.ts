import { LoginActionType } from '../action-types';
import { fetchLoginErrorI, INIT_SESSION_SUCCESS_I, receiveLoginI } from '../../interfaces';
import { userT } from '@/types/userType';

export const receiveLoginAC = (): receiveLoginI => {
    return {
        type: LoginActionType.RECEIVE_LOGIN,
        // access_token,
        // user,
    };
};

export const initSessionSuccessAC = (user: userT): INIT_SESSION_SUCCESS_I => {
    return {
        type: LoginActionType.INIT_SESSION_SUCCESS,
        user,
    };
};

export const fetchLoginErrorAC = (errMsg: string): fetchLoginErrorI => {
    return {
        type: LoginActionType.FETCH_LOGIN_ERROR,
        errMsg,
    };
};
