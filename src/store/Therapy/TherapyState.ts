import { TherapyT } from '@/types/Therapy';

export interface TherapyState {
    therapiesList: TherapyT[];
    isLoading: boolean;
}
