import { TherapyT } from '@/types/Therapy';
import { TherapiesActionTypes } from '../actions/action-types';

interface RequestTherapyI {
    type: TherapiesActionTypes.REQUEST_THERAPIES;
}

interface ReceiveTherapyI {
    type: TherapiesActionTypes.RECEIVE_THERAPIES;
    therapiesList: TherapyT[];
}

interface FETCH_Therapy_ERROR {
    type: TherapiesActionTypes.FETCH_THERAPIES_ERROR;
    errMsg: string;
}

export type TherapyAction = RequestTherapyI | ReceiveTherapyI | FETCH_Therapy_ERROR;
