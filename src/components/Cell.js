import React from "react";
import "../Game.css";

class Cell extends React.Component {
    // create the selectCell function
    selectCell = () => {
        this.props.selectCell(this.props.row, this.props.column);
    };
    render() {
        return (
            <div
                className={this.props.cellClass}
                id={this.props.id}
                onClick={this.selectCell}
            ></div>
        );
    }
}

export default Cell;
