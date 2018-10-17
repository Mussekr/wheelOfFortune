import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wheel from '../RandomWheel';
import actionCreators from '../actions/actionCreators';

const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

class PointWheel extends Component {

    getColors(index) {
        if(index % 3 === 0) {
            return 'green';
          } else if(index % 2 === 0) {
            return 'blue';
          } else {
            return 'red';
          }
    }

    getSegments() {
        let segments = [];
        for(let i = 1; i < 21; i++ ) {
            segments.push({
                name: String(i * 100),
                color: this.getColors(i),
            });
        }
        segments = insert(segments, 4, { name: 'Rosvo', color: 'black' });
        segments = insert(segments, 19, { name: 'Ohi', color: 'black' });
        return segments;
    }

    render() {
        const segments = this.getSegments();
        const { dispatch } = this.props;
        return (
            <div>
                <Wheel
                    segments={segments}
                    onComplete={(selected) => dispatch(actionCreators.onSpinComplete(selected))}
                    ref={( wheelRef ) => {
                        this.wheel = wheelRef;
                    }}
                />
                <button onClick={() => this.wheel.spinWheel()}>Pyöritä</button>
            </div>

        )
    }
}

export default connect()(PointWheel);
