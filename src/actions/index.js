const playerNamespace = 'players';
const wordNamespace = 'word';
const gameNamespace = 'game';

export default {
    SET_PLAYERS: `${playerNamespace}/SET_PLAYERS`,
    SET_PHRASE: `${wordNamespace}/SET_PHRASE`,
    START_GAME: `${gameNamespace}/START_GAME`,
    RESET_GAME: `${gameNamespace}/RESET_GAME`,
    CHANGE_TURN: `${playerNamespace}/CHANGE_TURN`,
    SHOW_CHARACTER_LIST: `${wordNamespace}/SHOW_CHARACTER_LIST`,
    HIDE_CHARACTER_LIST: `${wordNamespace}/HIDE_CHARACTER_LIST`,
    SET_CHARACTERS: `${wordNamespace}/SET_CHARACTERS`,
    ADD_POINTS: `${playerNamespace}/ADD_POINTS`,
    BOUGHT_VOWEL: `${wordNamespace}/BOUGHT_VOWEL`,
    RESET_BOUGHT_VOWEL: `${wordNamespace}/RESET_BOUGHT_VOWEL`,
};


