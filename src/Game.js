import React from "react";
import About from "./components/About";
import arrayClone from "./components/helperFunctions";
import Grid from "./components/Grid";
import Buttons from "./components/Buttons";
import "./Game.css";

class Game extends React.Component {
    constructor() {
        super();
        // create vars for speed, rows and columns
        // the grid is going to be 50X30
        this.speed = 100;
        this.rows = 30;
        this.columns = 50;

        this.state = {
            // state to count the generation
            generation: 0,
            // state for the full grid and create an array as big
            // as the rows var and fill it using map and create
            // another array as big as the columns var and each
            // element in that array is false
            gridFull: Array(this.rows)
                .fill()
                .map(() => Array(this.columns).fill(false))
        };
    }

    // methods used:

    // the select cell method:
    // whith select cell method, update the above array and set it to true when a cell is selected
    selectCell = (row, column) => {
        // create a copy of the array instead of changing the state of the gridFull straight
        let gridCopy = arrayClone(this.state.gridFull);
        // if it is selected, return true or keep it false
        gridCopy[row][column] = !gridCopy[row][column];
        this.setState({
            gridFull: gridCopy
        });
    };

    // the random method:
    // this method is going to make sure that some cells are randomly being selected by a single click
    random = () => {
        // create a copy of the grid
        let gridCopy = arrayClone(this.state.gridFull);
        // using for-loop, it should go through every cell of the grid and decide whether it should be selected or not
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                // randomly choose wether a cell stays selected of not
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        // if it is selected, return true
        this.setState({
            gridFull: gridCopy
        });
    };

    // the play button method is to trigger the play method
    playButton = () => {
        // each time the user clicks the play button, it resets
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.playButton, this.speed);
    };

    // the pause button method to pause the play method
    pauseButton = () => {
        clearInterval(this.intervalId);
    };

    // setting the speed to 1000 msec
    slow = () => {
        this.speed = 1000;
        this.playButton();
    };

    // setting the speed to 100 msec
    fast = () => {
        this.speed = 100;
        this.playButton();
    };

    // setting the current state of the grid to false using a new variable
    // and set the generation to zero
    clear = () => {
        var grid = Array(this.rows)
            .fill()
            .map(() => Array(this.columns).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0
        });
    };

    // using switch statement, switch the sizes that are created in buttons.js
    gridSize = size => {
        switch (size) {
            case "1":
                this.columns = 20;
                this.rows = 10;
                break;
            case "2":
                this.columns = 50;
                this.rows = 30;
                break;
            default:
                this.columns = 70;
                this.rows = 50;
        }
        this.clear();
    };

    // the play method:
    play = () => {
        // have the two copies of the grid
        // check to see what the grid is currently like
        let g = this.state.gridFull;
        // and change the squares on the clone and set the state using the clone
        let g2 = arrayClone(this.state.gridFull);
        // all the rules for the game:
        // go through every element in the grid
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                // count = how many neighbors does the cell have?
                let count = 0;
                // go through and if there is a neighbor, it increases the count by 1.
                // note that each cell has 8 neighbors
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.columns - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.columns - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.columns - 1)
                    if (g[i + 1][j + 1]) count++;
                // and check if they are going to die or live
                // if it is less than 2 or more than 3, it dies.
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                // if it is dead and it has 3 alive neighbors, it becomes alive cell.
                if (!g[i][j] && count === 3) g2[j][j] = true;
            }
        }
        this.setState({
            // we add the gridFull and the generation plus 1
            gridFull: g2,
            generation: this.state.generation + 1
        });
    };

    componentDidMount() {
        // this method will randomly select cells
        this.random();
        // this will play the game
        this.playButton();
    }

    render() {
        return (
            <div>
                <h1 className="main-title">Conway's Game of Life</h1>
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    columns={this.columns}
                    selectCell={this.selectCell}
                />
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    random={this.random}
                    gridSize={this.gridSize}
                />
                <br />
                <div className="text-box">
                    <About />
                </div>
                <p className="footer">Mirage Kamran - miragekamran@gmail.com</p>
            </div>
        );
    }
}

export default Game;
