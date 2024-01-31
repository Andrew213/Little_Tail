import { TodayType } from '@/types/TodayType';
import { TodayActionTypes } from '../actions/action-types';

interface RequestTodayI {
    type: TodayActionTypes.REQUEST_TODAY;
}

interface RequestCreateTodayI {
    type: TodayActionTypes.REQUEST_CREATE_TODAY;
}

interface ReceiveTodayI {
    type: TodayActionTypes.RECEIVE_TODAY;
    todayList: TodayType[];
    total: number;
}

interface ReceiveCreateTodayI {
    type: TodayActionTypes.RECEIVE_CREATE_TODAY;
    isLoading: boolean;
    successMsg: string;
}

interface FetchTodayErrorI {
    type: TodayActionTypes.FETCH_TODAY_ERROR;
    errMsg: string;
}

interface FetchCreateTodayErrorI {
    type: TodayActionTypes.FETCH_CREATE_TODAY_ERROR;
    isLoading: boolean;
    errMsg: string;
}

export type getTodayAction =
    | RequestTodayI
    | ReceiveTodayI
    | FetchTodayErrorI
    | RequestCreateTodayI
    | ReceiveCreateTodayI
    | FetchCreateTodayErrorI;
