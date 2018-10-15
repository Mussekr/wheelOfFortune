import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Init from './containers/Init';
import Game from './containers/Game';

class App extends Component {
	static propTypes = {
		isGameStarted: PropTypes.bool,
	};

	render() {
		const { isGameStarted, } = this.props;
		return (
			<div>
				<div className="row">
					<div className="column column-50 column-offset-50"><h1 className="rainbow">Onnenpyörä</h1></div>
				</div>
				<div className="row">
					<div className="column">
						{isGameStarted ? <Game /> : <Init />}
					</div>
				</div>
      		</div>
		);
	}
}
const mapStateToProps = (state) => ({
		isGameStarted: state.gameReducer.isGameStarted,
})

export default connect(mapStateToProps)(App);
