export type userT = {
    firstName: string;
    id: string;
    lastName: string;
    login: string;
    role: string;
};

export type LoginState = {
    session: boolean;
    access_token: string;
    isLoading: boolean;
    errMsg: string;
    user: userT | null;
};
