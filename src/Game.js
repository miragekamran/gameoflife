import React from "react";
import "./Game.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return (
            <div
                className="Cell"
                style={{
                    left: `${CELL_SIZE * x + 1}px`,
                    top: `${CELL_SIZE * y + 1}px`,
                    width: `${CELL_SIZE - 1}px`,
                    height: `${CELL_SIZE - 1}px`
                }}
            />
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        isRunning: false,
        interval: 100
    };

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    };

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    };

    runIteration() {
        console.log("running iteration");
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        // TODO: Add logic for each iteration here.
        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

    /**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board
     * @param {int} x
     * @param {int} y
     */
    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1]
        ];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (
                x1 >= 0 &&
                x1 < this.cols &&
                y1 >= 0 &&
                y1 < this.rows &&
                board[y1][x1]
            ) {
                neighbors++;
            }
        }

        return neighbors;
    }

    handleIntervalChange = event => {
        this.state({ interval: event.target.value });
    };

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    };

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = Math.random() >= 0.5;
            }
        }

        this.setState({ cells: this.makeCells() });
    };

    // Create an empty board
    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    // Create cells from this.board
    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: rect.left + window.pageXOffset - doc.clientLeft,
            y: rect.top + window.pageYOffset - doc.clientTop
        };
    }

    handleClick = event => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    };

    render() {
        const { cells, interval, isRunning } = this.state;
        return (
            <div>
                <div
                    className="Board"
                    style={{
                        width: WIDTH,
                        height: HEIGHT,
                        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                    }}
                    onClick={this.handleClick}
                    ref={n => {
                        this.boardRef = n;
                    }}
                >
                    {cells.map(cell => (
                        <Cell
                            x={cell.x}
                            y={cell.y}
                            key={`${cell.x},${cell.y}`}
                        />
                    ))}
                </div>

                <div className="controls">
                    Update every
                    <input
                        value={this.state.interval}
                        onChange={this.handleIntervalChange}
                    />
                    msec
                    {isRunning ? (
                        <button className="button" onClick={this.stopGame}>
                            Stop
                        </button>
                    ) : (
                        <button className="button" onClick={this.runGame}>
                            Run
                        </button>
                    )}
                    <button className="button" onClick={this.handleRandom}>
                        Random
                    </button>
                    <button className="button" onClick={this.handleClear}>
                        Clear
                    </button>
                </div>
                <br />
                <div className="text-box">
                    <h3>Rules:</h3>
                    <p>
                        The universe of the Game of Life is an infinite,
                        two-dimensional orthogonal grid of square cells, each of
                        which is in one of two possible states, live or dead,
                        (or populated and unpopulated, respectively). Every cell
                        interacts with its eight neighbours, which are the cells
                        that are horizontally, vertically, or diagonally
                        adjacent. At each step in time, the following
                        transitions occur:
                        <ol>
                            <li>
                                Any live cell with fewer than two live
                                neighbours dies, as if by underpopulation.
                            </li>
                            <li>
                                Any live cell with two or three live neighbours
                                lives on to the next generation.
                            </li>
                            <li>
                                Any live cell with more than three live
                                neighbours dies, as if by overpopulation.
                            </li>
                            <li>
                                Any dead cell with exactly three live neighbours
                                becomes a live cell, as if by reproduction.
                            </li>
                        </ol>
                        These rules, which compare the behavior of the automaton
                        to real life, can be condensed into the following:
                        <ol>
                            <li>
                                Any live cell with two or three live neighbours
                                survives.
                            </li>
                            <li>
                                Any dead cell with three live neighbours becomes
                                a live cell.
                            </li>
                            <li>
                                All other live cells die in the next generation.
                                Similarly, all other dead cells stay dead.
                            </li>
                        </ol>
                        The initial pattern constitutes the seed of the system.
                        The first generation is created by applying the above
                        rules simultaneously to every cell in the seed; births
                        and deaths occur simultaneously, and the discrete moment
                        at which this happens is sometimes called a tick. Each
                        generation is a pure function of the preceding one. The
                        rules continue to be applied repeatedly to create
                        further generations.
                    </p>
                </div>
            </div>
        );
    }
}

export default Game;
