import React from 'react';
import '../Game.css';

class About extends React.Component {
    render() {
        return (
            <div>
                <h1>About The Game:</h1>
                <br></br>
                <h2>What is Conway's Game of Life</h2>
                <br></br>
                <p>
                    It is a 'cellular automaton', and was invented by Cambridge
                    mathematician John Conway.
                </p>
                <br></br>
                <h2>What is 'cellular automaton'?</h2>
                <br></br>
                <p>
                    A cellular automaton is a collection of "colored" cells on a
                    grid of specified shape that evolves through a number of
                    discrete time steps according to a set of rules based on the
                    states of neighboring cells. The rules are then applied
                    iteratively for as many time steps as desired. von Neumann
                    was one of the first people to consider such a model, and
                    incorporated a cellular model into his "universal
                    constructor."
                </p>
                <br></br>
                <h2>How does the game work?</h2>
                <br></br>
                <p>
                    It consists of a collection of cells which, based on a few
                    mathematical rules, can live, die or multiply. Depending on
                    the initial conditions, the cells form various patterns
                    throughout the course of the game.
                </p>
                <br></br>
                <h2>What are the rules in this game?</h2>
                <br></br>
                <p>
                    Every cell interacts with its eight neighbours, which are
                    the cells that are horizontally, vertically, or diagonally
                    adjacent. At each step in time, the following transitions
                    occur:
                </p>
                <br></br>
                <ol>
                    <li>
                        Any live cell with fewer than two live neighbours dies,
                        as if by underpopulation.
                    </li>
                    <li>
                        Any live cell with two or three live neighbours lives on
                        to the next generation.
                    </li>
                    <li>
                        Any live cell with more than three live neighbours dies,
                        as if by overpopulation.
                    </li>
                    <li>
                        Any dead cell with exactly three live neighbours becomes
                        a live cell, as if by reproduction.
                    </li>
                </ol>
                These rules, which compare the behavior of the automaton to real
                life, can be condensed into the following:
                <ol>
                    <li>
                        Any live cell with two or three live neighbours
                        survives.
                    </li>
                    <li>
                        Any dead cell with three live neighbours becomes a live
                        cell.
                    </li>
                    <li>
                        All other live cells die in the next generation.
                        Similarly, all other dead cells stay dead.
                    </li>
                </ol>
            </div>
        );
    }
}

export default About;