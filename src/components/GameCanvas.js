import React from 'react';
import '../App.css';

class GameCanvas extends React.Component {
    shouldComponentUpdate() {
      return false;
    }
  
    render() {
      return (
        <canvas className={ "canvas" }
          ref={node =>
            node ? this.props.ctxRef(node.getContext('2d')) : null} />
      );
    }
  }

export default GameCanvas;