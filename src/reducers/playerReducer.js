import actions from '../actions';

export const initialState = {
    players: {},
    playerTurn: 1,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_PLAYERS:
            return { ...state, players: action.players };
        case actions.CHANGE_TURN:
            return { ...state, playerTurn: action.nextTurn };
        case actions.ADD_POINTS:
            return { ...state, players: action.players, };
        case actions.RESET_GAME:
            return { ...initialState };
        default:
            return state;
    }
}

export default reducer;