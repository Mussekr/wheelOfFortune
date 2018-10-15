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


export default {
    setPhrase,
    setPlayers,
    startGame,
}