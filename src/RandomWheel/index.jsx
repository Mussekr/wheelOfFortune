import React from 'react';
import PropTypes from 'prop-types';
import RandomWheel from './components/Wheel';
import Easing from 'easing';
import random from 'lodash/random';

import './react-wheel.scss';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

export default class ReactWheel extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			activeSegment: false
		};
	}

	static get defaultProps() {
		return {
			onComplete: ( result ) => {
			}
		}
	}

	static get propTypes() {
		let segmentType = PropTypes.shape( {
			name: PropTypes.string.isRequired,
			color: PropTypes.oneOf( [ 'red', 'blue', 'green', 'black' ] ),
            data: PropTypes.object,
		} );

		return {
			segments: PropTypes.arrayOf( segmentType ).isRequired,
			onComplete: PropTypes.func,
		}
	}

	spinWheel() {
        let numSegments = this.props.segments.length;
        const spinTime = getRandomArbitrary(3250, 6500);
		this.setState( {
			animating: true
		} );

		let currentValue = this.state.activeSegment || 0;

		// We'll want to run the animation through approximately five cycles.
		let cycles = random( 4, 6, false );

		let numSteps = (cycles * numSegments) + (random( 0, numSegments - 1, false ));
		let easing = Easing( numSteps, 'quadratic' );

		let easedValues = easing.map( ( fraction, index ) => {
			return {
				segment: (currentValue + index) % numSegments,
				time: fraction * spinTime,
			}
		} );
		let finalValue = easedValues[ easedValues.length - 1 ].segment;

		if ( 'development' === process.env.NODE_ENV ) {
			console.log( `easing through ${numSteps} steps to ${finalValue}`, JSON.stringify( easedValues ) );
		}

		easedValues.forEach( ( { segment, time } ) => {
			setTimeout( () => {
				this.setState( { activeSegment: segment } )
			}, time )
		} );

		// Flash the final segment.
		for ( let i = 0; i < 3; i++ ) {
			let flashTime = (spinTime / 10);
			setTimeout( () => {
				this.setState( {
					activeSegment: false
				} );
			}, spinTime + i * flashTime );
			setTimeout( () => {
				this.setState( {
					activeSegment: finalValue,
					animating: (i !== 2)
				} );
				if ( i === 2 ) {
					this.props.onComplete( this.props.segments[ finalValue ] );
				}
			}, spinTime + i * flashTime + flashTime / 2 );
		}

		return finalValue;
	}

	render() {
		return (
			<div>
				<RandomWheel spin={() => this.spinWheel()} {...this.props} activeSegment={this.state.activeSegment}/>
			</div>
		);
	}
}
