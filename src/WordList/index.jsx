import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WordList extends Component {
    static propTypes = {
        phrase: PropTypes.array,
    };
    static defaultProps = {
        phrase: [{}],
    }
    render() {
        console.log(this.props.phrase);
        const words = this.props.phrase.map((word, index) => {
            const characters = word.map((character, characterIndex) => {
                return (
                    <div key={`${index}-${characterIndex}`} className="word-list-word">
                        {character.visible ? character.char : '-'}
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
