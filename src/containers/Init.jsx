import React, { Component } from 'react';
import { connect } from 'react-redux';
import actionCreators from '../actions/actionCreators';
import { Row, Col, Form, Button, FormGroup, Label, Input } from 'reactstrap';


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
            <>
                <Form onSubmit={this.submitInit}>
                    <Row>
                        <Col sm={12} md={{ offset: 4, size: 8 }}>
                            <h1 className="display-5">Lähtöarvot peliin</h1>
                            <FormGroup>
                                <Label for="player1">Pelaaja 1</Label>
                                <Input valid={Boolean(this.state.player1)} invalid={! Boolean(this.state.player1)} id="player1" type="text" onChange={(ev) => this.onInputChange('player1', ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="player2">Pelaaja 2</Label>
                                <Input valid={Boolean(this.state.player2)} invalid={! Boolean(this.state.player2)} id="player2" type="text" onChange={(ev) => this.onInputChange('player2', ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="player3">Pelaaja 3</Label>
                                <Input valid={Boolean(this.state.player3)} invalid={! Boolean(this.state.player3)} id="player3" type="text" onChange={(ev) => this.onInputChange('player3', ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phrase">Lause</Label>
                                <Input valid={Boolean(this.state.wordPhrase)} invalid={! Boolean(this.state.wordPhrase)} id="phrase" type="password" onChange={(ev) => this.onInputChange('wordPhrase', ev.target.value)} />
                            </FormGroup>
                            <Button block type="submit">Aloita</Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

export default connect()(Init);

