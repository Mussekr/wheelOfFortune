import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import WordList from '../WordList';
import Wheel from './Wheel';
import CharacterList from '../components/CharacterList';
import actionCreators from '../actions/actionCreators';
import Logs from './Logs';

class Game extends Component {
    static propTypes = {
        phrase: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    };

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
            overridePhrase,
        } = this.props;
        const playerInTurn = _.find(players, { id: playerTurn });
        console.log(playerInTurn);
        return (
            <>
                <Row>
                    <Wheel />
                </Row>
                <Row>
                    <Col sm={12} md={{ size: 12 }} className="d-flex justify-content-end">
                        <WordList override={overridePhrase} phrase={phrase} />
                    </Col>
                </Row>
                {
                    showConsonants && ! overridePhrase && (
                        <Row>
                            <Col sm={12} md={{ size: 12 }} className="text-center">
                                <h3>Valitse konsonantti</h3>
                                <CharacterList onClickCharacter={(selected) => dispatch(actionCreators.checkPhraseCharacters(selected, 'consonant'))} characters={consonants} />
                            </Col>
                        </Row>
                    )
                }
                {
                    !showConsonants && !hasBoughtVowel && _.get(playerInTurn, 'points') >= 300 && ! overridePhrase &&  (
                        <Row>
                            <Col sm={12} md={{ size: 11 }} className="text-center">
                                <h3>Osta vokaali, 300 points / kpl</h3>
                                <CharacterList onClickCharacter={(selected) => dispatch(actionCreators.checkPhraseCharacters(selected, 'vowel'))} characters={vowels} />
                            </Col>
                        </Row>
                    )
                }
                <Row>
                    <Col sm={12} md={{ size: 4, offset: 8 }} className="text-left">
                        <Logs />
                    </Col>
                </Row>
            </>
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
    overridePhrase: _.get(state, 'wordReducer.override', false),
});

export default connect(mapStateToProps)(Game);