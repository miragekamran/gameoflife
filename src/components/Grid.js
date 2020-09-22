import React from "react";
import Cell from "./Cell";
import "../Game.css";

class Grid extends React.Component {
    render() {
        // create a var for width and set it to the state of the columns from Main.js and multiply it by 16
        const width = this.props.columns * 16;
        // create an array var for rows
        var rowsArray = [];

        // loop through both rows and columns and create a cell Id for each cell element
        var cellClass = "";
        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.columns; j++) {
                let cellId = i + "_" + j;

                // also using cellClass, see if each cell is going to be
                // selected or not. If true, cell is selected otherwise unselected
                cellClass = this.props.gridFull[i][j]
                    ? "cell is selected"
                    : "cell is unselected";
                // push the cell to the row array
                rowsArray.push(
                    <Cell
                        cellClass={cellClass}
                        key={cellId}
                        cellId={cellId}
                        row={i}
                        column={j}
                        selectCell={this.props.selectCell}
                    />
                );
            }
        }

        return (
            <div className="grid" style={{ width: width }}>
                {rowsArray};
            </div>
        );
    }
}

export default Grid;
