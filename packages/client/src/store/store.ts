import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';
import { jwt } from './middlewares/jwt';

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(jwt, thunk)));
