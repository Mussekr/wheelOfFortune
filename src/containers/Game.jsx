import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import WordList from '../WordList';
import Wheel from './Wheel';

class Game extends Component {
    static propTypes = {
        phrase: PropTypes.arrayOf(PropTypes.object),
    };

    render() {
        const { phrase } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="column column column-90 column-offset-10">
                        <WordList phrase={phrase} />
                    </div>
                </div>
                <div className="row">
                    <div className="column column-75 float-right">
                        {/*<Wheel />*/}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    phrase: _.get(state, 'wordReducer.phrase', []),
});

export default connect(mapStateToProps)(Game);