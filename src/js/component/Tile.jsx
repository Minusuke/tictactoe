import React, { Component } from "react";
import "../../styles/index.css";

export default class Tile extends Component {
  tileClick = () => {
    this.props.updateBoard(this.props.location, this.props.turn);
  };

  render() {
    return (
      <div className={"Tile " + this.props.location} onClick={this.tileClick}>
        <p>{this.props.value}</p>
      </div>
    );
  }
}
