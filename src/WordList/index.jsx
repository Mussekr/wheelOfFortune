import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './word-list.scss';

export default class WordList extends Component {
    static propTypes = {
        phrase: PropTypes.array,
        override: PropTypes.bool,
    };
    static defaultProps = {
        phrase: [[{}]],
        override: false,
    }
    render() {
        const { override, phrase } = this.props;
        const words = phrase.map((word, index) => {
            const characters = word.map((character, characterIndex) => {
                return (
                    <div key={`${index}-${characterIndex}`} className={`word-list-word ${character.visible || override ? 'word-list-anim-spin' : ''}`}>
                        {character.visible || override ? character.char : '*'}
                    </div>
                )
            });
            return (
                <div className="word-list-container u-padding-left" key={index}>{characters}</div>
            )
        })
        return (
            <div className="word-list">
                {words}
            </div>
        );
    }
}
