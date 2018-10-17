import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import WordList from '../WordList';
import Wheel from './Wheel';
import PlayerList from '../components/PlayerList';
import CharacterList from '../components/CharacterList';
import actionCreators from '../actions/actionCreators';

class Game extends Component {
    static propTypes = {
        phrase: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    };

    resetGame = () => {
        //eslint-disable-next-line
        if(confirm('Oletko varma? Progressio menetetään.')) {
            this.props.dispatch(actionCreators.resetGame());
        }
    };

    skipTurn = () => {
        //eslint-disable-next-line
        if(confirm('Oletko varma?')) {
            this.props.dispatch(actionCreators.changeTurn())
        }
    }

    render() {
        const {
            phrase,
            players,
            playerTurn,
            consonants,
            showConsonants,
            dispatch,
            vowels,
            hasBoughtVowel,
        } = this.props;
        const playerInTurn = _.find(players, { id: playerTurn });
        console.log(playerInTurn);
        return (
            <div>
                <div className="row">
                    <button onClick={this.resetGame}>Resetoi peli</button>
                    <button onClick={this.skipTurn}>Skippaa vuoro (override)</button>
                    <div className="column column column-70 column-offset-30">
                        <PlayerList players={players} playerTurn={playerTurn} />
                    </div>
                </div>
                <div className="row">
                    <div className="column column column-90 column-offset-10">
                        <WordList phrase={phrase} />
                    </div>
                </div>
                <div className="row">
                    <div className="column column-75 float-right">
                        <Wheel />
                    </div>
                </div>
                {
                    showConsonants && (
                        <div className="row">
                            <div className="column column-75 float-right">
                                <h3>Valitse konsonantti</h3>
                                <CharacterList onClickCharacter={(selected) => dispatch(actionCreators.checkPhraseCharacters(selected, 'consonant'))} characters={consonants} />
                            </div>
                        </div>
                    )
                }
                {
                    !showConsonants && !hasBoughtVowel && _.get(playerInTurn, 'points') >= 300 && (
                        <div className="row">
                            <div className="column column-75 float-right">
                                <h3>Osta vokaali, 300 points / kpl</h3>
                                <CharacterList onClickCharacter={(selected) => dispatch(actionCreators.checkPhraseCharacters(selected, 'vowel'))} characters={vowels} />
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    phrase: _.get(state, 'wordReducer.phrase', []),
    consonants: _.get(state, 'wordReducer.consonants', []),
    playerTurn: _.get(state, 'playerReducer.playerTurn'),
    players: _.get(state, 'playerReducer.players', {}),
    showConsonants: _.get(state, 'wordReducer.showConsonants', false),
    showVowels: _.get(state, 'wordReducer.showVowels', false),
    vowels: _.get(state, 'wordReducer.vowels', []),
    hasBoughtVowel: _.get(state, 'wordReducer.hasBoughtVowel', false),
});

export default connect(mapStateToProps)(Game);