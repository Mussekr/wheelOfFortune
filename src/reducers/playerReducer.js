import actions from '../actions';

const initialState = {
    players: {},
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_PLAYERS:
            return { ...state, players: action.players };
        default:
            return state;
    }
}

export default reducer;