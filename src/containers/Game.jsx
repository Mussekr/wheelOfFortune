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
                    <Col sm={12} md={{ size: 12 }} className="d-flex justify-content-end anim-bounce-right">
                        <WordList override={overridePhrase} phrase={phrase} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={7} className="anim-bounce-left">
                        {
                            !showConsonants && !hasBoughtVowel && _.get(playerInTurn, 'points') >= 300 && ! overridePhrase &&  (
                                <>
                                    <h3>Osta vokaali, 300 points / kpl</h3>
                                    <CharacterList onClickCharacter={(selected) => dispatch(actionCreators.checkPhraseCharacters(selected, 'vowel'))} characters={vowels} />
                                </>
                            )
                        }
                        {
                            showConsonants && ! overridePhrase && (
                                <>
                                    <h3>Valitse konsonantti</h3>
                                    <CharacterList onClickCharacter={(selected) => dispatch(actionCreators.checkPhraseCharacters(selected, 'consonant'))} characters={consonants} />
                                </>
                            )
                        }
                    </Col>
                    <Col sm={12} md={{ size: 5, }} className="text-left anim-bounce-right">
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