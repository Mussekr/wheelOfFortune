import actions from '../actions';

const initialState = {
    logs: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.LOG_MESSAGE:
            return { ...state, logs: [ ...state.logs, action.log ] };
        case actions.RESET_GAME:
            return { ...initialState };
        default:
            return state;
    }
}

export default reducer;