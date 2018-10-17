import React, { Component } from 'react';
import { connect } from 'react-redux';
import actionCreators from '../actions/actionCreators';

const specialCharacters = ['.', ',', '-', '?', '!', ':', ';'];

class Init extends Component {

    state = {
        player1: '',
        player2: '',
        player3: '',
        wordPhrase: '',
    };

    parseWordPhrase(phrase = '') {
        let phraseModel = [];
        const wordsArray = phrase.split(' ');
        wordsArray.forEach((word) => {
            const characterArray = word.split('');
            phraseModel = phraseModel.concat([
                characterArray.map((character) => ({
                    char: character,
                    visible: specialCharacters.find((char) => char === character),
                }))
            ]);
        });
        return phraseModel;
    }

    submitInit = (ev) => {
        const { dispatch } = this.props;
        ev.preventDefault();
        const playerModel = {
            player1: {
                id: 1,
                name: this.state.player1,
                points: 0,
            },
            player2: {
                id: 2,
                name: this.state.player2,
                points: 0,
            },
            player3: {
                id: 3,
                name: this.state.player3,
                points: 0,
            },
        };

        const wordModel = {
            phrase: this.parseWordPhrase(this.state.wordPhrase),
        }

        dispatch(actionCreators.setPhrase(wordModel));
        dispatch(actionCreators.setPlayers(playerModel));
        dispatch(actionCreators.startGame());
    }

    onInputChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitInit}>
                    <div className="row">
                        <div className="column column-50 column-offset-25">
                            <h1>Lähtöarvot peliin</h1>
                            <label htmlFor="player1" >Pelaaja 1</label>
                            <input id="player1" type="text" onChange={(ev) => this.onInputChange('player1', ev.target.value)} />
                            <label htmlFor="player2" >Pelaaja 2</label>
                            <input id="player2" type="text" onChange={(ev) => this.onInputChange('player2', ev.target.value)} />
                            <label htmlFor="player3" >Pelaaja 3</label>
                            <input id="player3" type="text" onChange={(ev) => this.onInputChange('player3', ev.target.value)} />
                            <label htmlFor="word-phrase" >Lause</label>
                            <input id="word-phrase" type="text" onChange={(ev) => this.onInputChange('wordPhrase', ev.target.value)} />
                            <div className="float-right">
                                <button type="submit">Aloita</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect()(Init);

