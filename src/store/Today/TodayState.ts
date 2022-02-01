import { TodayType } from '@/types/TodayType';

export interface TodayState {
    todayListing: TodayType[];
    isLoading: boolean;
    errMsg: string;
}
