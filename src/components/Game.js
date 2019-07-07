import React from 'react';
import Canvas from './Canvas';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.lastUpdate = performance.now();
        this.rows = null;
        this.cols = null;
        
        this.state = {
            cells: []
        }
        this.updateCells = this.updateCells.bind(this);
        this.getCanvasSize = this.getCanvasSize.bind(this);

        // window.addEventListener('resize', this.onResize.bind(this));
    }

    getCanvasSize(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }

    life(cells) {
        var x = 0
        var y = 0
        cells.forEach(r => {
            x = 0
            r.forEach(c => {
                if ((y - 1 >= 0 && x - 1 >= 0) && (y + 1 <= this.rows && x + 1 <= this.cols)) {
                    var top = cells[y - 1][x];
                    var topr = cells[y - 1][x + 1];
                    var right = cells[y][x + 1];
                    var bottomr = cells[y + 1][x + 1];
                    var bottom = cells[y + 1][x];
                    var bottoml = cells[y + 1][x - 1];
                    var left = cells[y][x - 1];
                    var topl = cells[y - 1][x - 1]
                    var neighbors = [top, topr, right, bottomr, bottom, bottoml, left, topl]
    
                    var aliveCount = 0;
                    neighbors.forEach(n => {
                        return n.alive ? aliveCount++ : aliveCount
                    });
    
                    if (c.alive) {
                        if (aliveCount < 2) {
                            c.alive = false;
                        }
                        else if (aliveCount > 3) {
                            c.alive = false;
                        }
                    }
                    else {
                        if (aliveCount === 3) {
                            c.alive = true;
                        }
                    }
                }
                x++;
            });
            y++; 
        });

        return cells;
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateCells);
    }

    updateCells() {
        if (this.lastUpdate < performance.now() - this.props.options.updateRate) {
            this.setState({ cells: this.life(this.state.cells) });
            this.lastUpdate = performance.now();
        }
        this.rAF = requestAnimationFrame(this.updateCells);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return(
            <Canvas cells={ this.state.cells } options={ this.props.options } sizeCallback={ this.getCanvasSize }/>
        )
    }
}

export default Game;