import { userT } from '@/components/types/userType';

export type LoginState = {
    access_token: string;
    isLoading: boolean;
    errMsg: string;
};

export type SessionState = {
    session: boolean;
    user: userT | null;
};
