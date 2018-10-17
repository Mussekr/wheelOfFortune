import actions from '../actions';
import { initialState as playerInitialState } from './playerReducer';
import { initialState as wordInitialState } from './wordReducer';

const initialState = {
    isGameStarted: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.START_GAME:
            return { ...state, isGameStarted: true };
        case actions.RESET_GAME:
            return { gameReducer: initialState, wordReducer: wordInitialState, playerReducer: playerInitialState, };
        default:
            return state;
    }
}

export default reducer;