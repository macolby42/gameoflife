import React from 'react';
import Game from './components/Game';
// import Settings from './components/Settings'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        pixelSize: 10,
        backgroundColor: '#000000',
        redBG: 0,
        greenBG: 0,
        blueBG: 0,
        cellColor: '#FFFFFF',
        updateRate: 32,
        pixelPadding: 3,
        startPortionRows: 15,
        startPortionCols: 15
      }
    };

    // this.updateOptions = this.updateOptions.bind(this);
  }

  // updateOptions(options) {
  //   this.setState({ options: options });
  // }

  render() {
    return (
      <div className="container">
        <Game options={ this.state.options }/>
        {/* <Settings updateOptions={ this.props.updateOptions } options={ this.state.options }/> */}
      </div>
    );
  }
}

export default App;
