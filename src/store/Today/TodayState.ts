import { TodayType } from '@/types/TodayType';

export interface TodayState {
    todayListing: TodayType[];
    createLoading: boolean;
    createSuccessMsg: string;
    createErrorMsg: string;
    isLoading: boolean;
    errMsg: string;
}
