import { TodayType } from '@/types/TodayType';
import { TodayActionTypes } from '../actions/action-types';

interface RequestTodayI {
    type: TodayActionTypes.REQUEST_TODAY;
}

interface ReceiveTodayI {
    type: TodayActionTypes.RECEIVE_TODAY;
    todayList: TodayType[];
}

interface FetchTodayErrorI {
    type: TodayActionTypes.FETCH_TODAY_ERROR;
    errMsg: string;
}

export type getTodayAction = RequestTodayI | ReceiveTodayI | FetchTodayErrorI;
