// @flow

import React, { Component } from 'react';
import './App.css';

import Canvas from './Canvas';
import Actor from './uml/Actor';

const canvasStyle = {
  background: 'cornsilk'
};

class App extends Component {
  state: {
    actorX: number;
    actorY: number;
  };

  constructor() {
    super();

    this.state = {
      actorX: 100,
      actorY: 100
    };
  }

  actorMove(x: number, y: number) {
    this.setState({
      actorX: x,
      actorY: y
    });
  }

  render() {
    return (
      <div className='App'>
        <Canvas width={ window.innerWidth } height={ window.innerHeight } style={ canvasStyle }>
          <Actor name={ 'lucas' } x={this.state.actorX} y={this.state.actorY} onMove={this.actorMove.bind(this)} />
        </Canvas>
      </div>
    );
  }
}

export default App;
