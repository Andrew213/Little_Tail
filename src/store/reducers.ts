import { ThunkDispatch } from 'redux-thunk';
import { combineReducers, Dispatch, Action } from 'redux';
import { PetsState } from './Pets/PetsState';
import { TodayState } from './Today/TodayState';
import { LoginState } from './Login/LoginState';
import { LoginReducer } from './Login/reducer';
import { PetsReducer } from './Pets/reducer';

export type RootState = {
    Pets: PetsState;
    Today: TodayState;
    Login: LoginState;
};

export const reducers = combineReducers({
    Pets: PetsReducer,
    // Today: todayReducer,
    Login: LoginReducer,
});

export type RootStore = ReturnType<typeof reducers>;

export type DispatchType = Dispatch<Action> & ThunkDispatch<RootStore, any, Action>;
