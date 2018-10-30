import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Init from './containers/Init';
import Game from './containers/Game';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import PlayerList from './components/PlayerList';
import actionCreators from './actions/actionCreators';

class App extends Component {
	static propTypes = {
		isGameStarted: PropTypes.bool,
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
	
	overridePhrase = () => {
		//eslint-disable-next-line
        if(confirm('Oletko varma?')) {
            this.props.dispatch(actionCreators.overridePhrase())
        }
	};

	render() {
		const { isGameStarted, playerTurn, players } = this.props;
		return (
			<Container fluid>
				<Row>
					<Col sm="12" md={{ size: 4, offset: 1 }}>
						<h1 className="rainbow">Onnenpyörä</h1>
					</Col>
				</Row>
				<Row>
					<Col className="align-middle" sm="12" md={{ size: 8, offset: 0 }}>
					{isGameStarted && (
						<ButtonGroup>
							<Button onClick={this.resetGame}>Resetoi peli</Button>
							<Button onClick={this.skipTurn}>Skippaa vuoro (override)</Button>
							<Button onClick={this.overridePhrase}>Näytä fraasi</Button>
						</ButtonGroup>
					)}
					</Col>
					<Col sm="12" md={4} className="d-flex justify-content-end">
						<PlayerList players={players} playerTurn={playerTurn} />
					</Col>
				</Row>
				{isGameStarted ? <Game /> : <Init />}
      		</Container>
		);
	}
}
const mapStateToProps = (state) => ({
	isGameStarted: state.gameReducer.isGameStarted,
	playerTurn: _.get(state, 'playerReducer.playerTurn'),
    players: _.get(state, 'playerReducer.players', {}),
})

export default connect(mapStateToProps)(App);
