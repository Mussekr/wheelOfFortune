import actions from "../actions";

const initialState = {
    phrase: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_PHRASE:
            return { ...state, ...action.phrase };
        default:
            return state;
    }
}

export default reducer;