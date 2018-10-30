import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './PlayerList.scss';

export default class PlayerList extends Component {
    static propTypes = {
        players: PropTypes.object,
        playerTurn: PropTypes.number,
    }

    render() {
        const { players, playerTurn } = this.props;
        return (
            <div className="player-list-container float-left">
                {_.map(players, (player, index) => (
                <div className={`player-list-player ${player.id === playerTurn ? 'player-list-is-turn' : ''}`} key={index}>
                    {player.name}
                    <br />
                    {`${player.points} pts`}
                </div>
            ))}
            </div>
        )
    }
}