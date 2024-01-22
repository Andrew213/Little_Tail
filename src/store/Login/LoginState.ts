import { userT } from '@/types/userType';

export type LoginState = {
    access_token: string;
    loginLoading: boolean;
    errMsg: string;
};

export type SessionState = {
    session: boolean;
    user: userT | null;
    errMsg: string;
    sessionLoading: boolean;
};
