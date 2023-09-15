import React, { Component } from "react";
import "../../styles/index.css";

const Announcement = ({ winner, isBoardFull }) => {
  return (
    <div className={winner || isBoardFull ? "visible" : "hidden"}>
      {winner ? <h2>{winner} wins!</h2> : <h2>Game over</h2>}
    </div>
  );
};
export default Announcement;
