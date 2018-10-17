import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CharacterList.scss';

export default class CharacterList extends Component {
    static propTypes = {
        characters: PropTypes.arrayOf(PropTypes.string),
        onClickCharacter: PropTypes.func,
    };

    static defaultProps = {
        characters: [],
        onClickCharacter: () => {},
    };

    render() {
        const { characters, onClickCharacter } = this.props;
        return (
            <div className="character-list-container">
            {characters.map((character, index) => (
                <div key={index} onClick={() => onClickCharacter(character)} className="character-list-character">
                    {character}
                </div>
            ))}
            </div>
        );
    }
}