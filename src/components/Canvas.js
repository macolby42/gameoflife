import React from 'react';
import GameCanvas from './GameCanvas'

function rand(from, to){
    return Math.floor(Math.random() * to) + from;  
}

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.saveContext = this.saveContext.bind(this);
        this.show = this.show.bind(this);
    }

    saveContext(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.parentNode.offsetWidth;
        this.height = this.ctx.canvas.parentNode.offsetHeight;
      }

    show() {
        this.props.cells.forEach(r => {
            r.forEach(c => {
                if (c.alive) {
                    this.ctx.fillStyle = `RGB(${rand(0,50)},${rand(100,255)},${rand(175,255)})`;
                    this.ctx.fillRect((c.x * this.props.options.pixelSize) + this.props.options.pixelPadding, (c.y * this.props.options.pixelSize) + this.props.options.pixelPadding, this.props.options.pixelSize - this.props.options.pixelPadding, this.props.options.pixelSize - this.props.options.pixelPadding);
                }
            })
        })
    }

    setupCanvas() {
        this.ctx.canvas.height = this.height;
        this.ctx.canvas.width = this.width;

        this.setState((state, props) => {
            return {
                pixelHeight: this.height / this.props.options.pixelSize,
                pixelWidth: this.width / this.props.options.pixelSize,
                rows: Math.floor(this.height / this.props.options.pixelSize),
                cols: Math.floor(this.width / this.props.options.pixelSize),
            };
        }, () => {
            this.props.sizeCallback(this.state.rows, this.state.cols);
            var x = 0
            var y = 0
            this.setState((state, props) => { 
                while (y <= this.state.rows) {
                    props.cells[y] = [] 
                    while (x <= state.cols) {
                        props.cells[y][x] = {
                            x: (x),
                            y: (y),
                            alive: (x < (Math.floor(state.cols/this.props.options.startPortionCols)) && (y < (Math.floor(state.rows/this.props.options.startPortionRows)))) ? Math.random() >= 0.5 : false
                        };
                        x++;
                    };
                    x = 0;
                    y++;
                };
            });
        })
    }

    componentDidUpdate() {
        this.ctx.fillStyle = this.props.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.show();
    }
    
    componentDidMount() {
        this.setupCanvas();
        this.ctx.fillStyle = this.props.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.show();
    }

    render() {
        return(<GameCanvas ctxRef={ this.saveContext } />);
    }
}

export default Canvas;