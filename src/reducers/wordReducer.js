import actions from "../actions";

export const initialState = {
    phrase: [],
    consonants: 'b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z'.split(','),
    usedConsonants: [],
    vowels: 'a,e,i,o,u,y,ä,ö'.split(','),
    usedVowels: [],
    showConsonants: false,
    showVowels: false,
    hasBoughtVowel: false,
    override: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_PHRASE:
            return { ...state, ...action.phrase };
        case actions.SHOW_CHARACTER_LIST:
            return { ...state, [action.characterType]: true, };
        case actions.HIDE_CHARACTER_LIST:
            return { ...state, [action.characterType]: false, };
        case actions.SET_CHARACTERS:
            return { ...state, [action.characterType]: action.characters };
        case actions.BOUGHT_VOWEL:
            return { ...state, hasBoughtVowel: true };
        case actions.RESET_BOUGHT_VOWEL:
            return { ...state, hasBoughtVowel: false };
        case actions.OVERRIDE_PHRASE:
            return { ...state, override: true, };
        case actions.RESET_GAME:
            return { ...initialState };
        default:
            return state;
    }
}

export default reducer;