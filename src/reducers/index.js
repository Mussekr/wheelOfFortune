import { combineReducers } from 'redux';
import wordReducer from './wordReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import logReducer from './logReducer';

const reducers = combineReducers({
    wordReducer,
    playerReducer,
    gameReducer,
    logReducer,
});

export default reducers;