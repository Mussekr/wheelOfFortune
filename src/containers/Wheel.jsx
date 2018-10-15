import React, { Component } from 'react';


const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

 function getColors(index) {
    if(index % 3 === 0) {
      return 'green';
    } else if(index % 2 === 0) {
      return 'blue';
    } else {
      return 'red';
    }
}

  let segments = [];
  for(let i = 1; i < 21; i++ ) {
    console.log(i);
    segments.push({
        name: String(i * 100),
        color: getColors(i),
    });
}
segments = insert(segments, 4, { name: 'Rosvo', color: 'black' });
segments = insert(segments, 19, { name: 'Ohi', color: 'black' });
console.log(segments);

export default class Wheel extends Component {
    
    render() {
        return (
            <Wheel
                segments={segments}
                onComplete={(selected) => console.log(selected)}
                ref={( wheelRef ) => {
                    this.wheel = wheelRef;
                }}
          />
        )
    }
}

