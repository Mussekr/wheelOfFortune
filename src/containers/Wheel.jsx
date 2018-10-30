import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Col, Button } from 'reactstrap';
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
        for(let i = 1; i < 13; i++ ) {
            segments.push({
                name: String(i * 25),
                color: this.getColors(i),
            });
        }
        
        segments = insert(segments, 4, { name: 'Ohi', color: 'black' });
        segments = insert(segments, 10, { name: 'Rosvo', color: 'black' });
        segments = insert(segments, 16, { name: 'Ohi', color: 'black' });
        return segments;
    }

    render() {
        const segments = this.getSegments();
        const { dispatch, showConsonants } = this.props;
        return (
            <>
            <Col sm={12} md={8}>
                <Wheel
                    segments={segments}
                    onComplete={(selected) => dispatch(actionCreators.onSpinComplete(selected))}
                    ref={( wheelRef ) => {
                        this.wheel = wheelRef;
                    }}
                />
            </Col>
            <Col sm={12} md={4}>
                {!showConsonants && (
                    <Button block color="primary" onClick={() => this.wheel.spinWheel()}>Pyöritä</Button>
                )}
            </Col>
            </>

        )
    }
}

const mapStateToProps = (state) => ({
    showConsonants: _.get(state, 'wordReducer.showConsonants', false),
})

export default connect(mapStateToProps)(PointWheel);
