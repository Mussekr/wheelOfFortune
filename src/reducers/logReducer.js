import actions from '../actions';

const initialState = {
    logs: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.LOG_MESSAGE:
            return { ...state, logs: [ ...state.logs, action.log ] };
        default:
            return state;
    }
}

export default reducer;