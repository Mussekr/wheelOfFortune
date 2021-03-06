import actions from '../actions';

const initialState = {
    isGameStarted: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.START_GAME:
            return { ...state, isGameStarted: true };
        case actions.RESET_GAME:
            return { ...initialState };
        default:
            return state;
    }
}

export default reducer;