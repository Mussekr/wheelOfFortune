import _ from 'lodash';
import actions from './index';

const setPhrase = (phrase) => (dispatch) => dispatch({
    type: actions.SET_PHRASE,
    phrase,
});

const setPlayers = (players) => (dispatch) => dispatch({
    type: actions.SET_PLAYERS,
    players
});

const startGame = () => (dispatch) => dispatch({
    type: actions.START_GAME,
});

const changeTurn = () => (dispatch, getState) => {
    const state = getState();
    let playerTurn = parseInt(_.get(state, 'playerReducer.playerTurn'), 10);
    if (playerTurn === 3) {
        dispatch({
            type: actions.CHANGE_TURN,
            nextTurn: 1,
        });
    } else {
        playerTurn++;
        dispatch({
            type: actions.CHANGE_TURN,
            nextTurn: playerTurn,
        });
    }
    dispatch({
        type: actions.RESET_BOUGHT_VOWEL,
    });
}

const showCharacterList = (type) => (dispatch) => dispatch({
    type: actions.SHOW_CHARACTER_LIST,
    characterType: type,
});

const hideCharacterList = (type) => (dispatch) => dispatch({
    type: actions.HIDE_CHARACTER_LIST,
    characterType: type,
});

const setCharacters = (characters, type) => (dispatch) => dispatch({
    type: actions.SET_CHARACTERS,
    characters,
    characterType: type,
});

const removeCharacter = (char, type) => (dispatch, getState) => {
    const state = getState();
    const typeCharacters = _.get(state, `wordReducer.${type}`);
    const newCharacters = _.filter(typeCharacters, (character) => character.trim() !== char.toLowerCase());
    dispatch(setCharacters(newCharacters, type));
};

const checkPhraseCharacters = (character, type = 'consonant') => (dispatch, getState) => {
    const state = getState();
    const phrase = _.get(state, 'wordReducer.phrase', []);
    let charactersMatched = 0;
    const newPhrase = phrase.map((word) =>
        word.map((char) => {
            if (char.char.toLowerCase() === character.trim()) {
                charactersMatched++;
                return {
                    ...char,
                    visible: true,
                }
            }
            return char;
        })
    );
    if (charactersMatched > 0) {
        dispatch(setPhrase({ phrase: newPhrase }));
        dispatch(addLog(`Kirjainta ${character} löytyi ${charactersMatched} kappaletta! Pyöritä uudelleen tai osta vokaali!`));
    } else {
        // Not a single match, so turn changes
        dispatch(changeTurn());
        dispatch(addLog(`Kirjainta ${character} ei löytynyt! Vuoro siirtyy seuraavalle!`));
    }
    if (type === 'vowel') {
        dispatch(removeCharacter(character ,'vowels'));
        dispatch(addPoints(-300));
        dispatch({
            type: actions.BOUGHT_VOWEL,
        })
    } else {
        dispatch(hideCharacterList('showConsonants'));
        dispatch(removeCharacter(character, 'consonants'));
    }
};

const onSpinComplete = (spinValue) => (dispatch, getState) => {
    const state = getState();
    const players = state.playerReducer.players;
    const playerTurn = _.get(state, 'playerReducer.playerTurn');
    const playerInTurn = _.find(players, { id: playerTurn });
    if (_.includes(['Rosvo', 'Ohi'], spinValue.name)) {
        console.log('Tää vuoro nyt missas!');
        if (spinValue.name === 'Rosvo') {
            const currentPoints = _.get(_.find(_.get(state, 'playerReducer.players', []), (player) => player.id === _.get(state, 'playerReducer.playerTurn')), 'points');
            dispatch(addPoints(-currentPoints))
            dispatch(addLog('Ohisektori! Vuoro siirtyi seuraavalle!'));
        } else {
            dispatch(addLog(`Rosvosektori! Pelaaja ${playerInTurn.name} menetti kaikki pisteensä!`));
        }
        dispatch(changeTurn());
        return;
    }
    dispatch(addPoints(spinValue.name));
    dispatch(addLog(`Pelaaja ${playerInTurn.name} sai ${spinValue.name} pistettä!`));
    dispatch(showCharacterList('showConsonants'));
};

const addPoints = (value) => (dispatch, getState) => {
    const state = getState();
    const players = _.get(state, 'playerReducer.players', {});
    const playerInTurn = _.get(state, 'playerReducer.playerTurn');
    const newPlayers = _.map(players, (player) => {
        if (player.id === playerInTurn) {
            console.log(parseInt(player.points, 10) + parseInt(value, 10), player.points, value);
            return {
                ...player,
                points: parseInt(player.points, 10) + parseInt(value, 10),
            };
        }
        return player;
    });
    dispatch({ type: actions.ADD_POINTS, players: newPlayers });

};

const resetGame = () => (dispatch) => dispatch({
    type: actions.RESET_GAME,
});

const overridePhrase = () => (dispatch) => dispatch({
    type: actions.OVERRIDE_PHRASE,
});

const addLog = (log) => (dispatch) => dispatch({
    type: actions.LOG_MESSAGE,
    log
});

export default {
    setPhrase,
    setPlayers,
    startGame,
    onSpinComplete,
    checkPhraseCharacters,
    resetGame,
    changeTurn,
    overridePhrase,
    addLog,
}