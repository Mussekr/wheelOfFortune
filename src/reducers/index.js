import { combineReducers } from 'redux';
import wordReducer from './wordReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

const reducers = combineReducers({
    wordReducer,
    playerReducer,
    gameReducer,
});

export default reducers;