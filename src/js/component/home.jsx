import React, { useState } from "react";
import Tile from "/src/js/component/Tile.jsx";
import Announcement from "/src/js/component/Announcement.jsx";
import ResetButton from "/src/js/component/ResetButton.jsx";
import "../../styles/index.css";

const Home = () => {
  const [gameBoard, setGameBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [turn, setTurn] = useState("");
  const [winner, setWinner] = useState("");
  const [playerName, setPlayerName] = useState(""); // Agregamos el estado playerName

  const Weapon = (startWeapon) => {
    setTurn(startWeapon);
  };

  const updateBoard = (location) => {
    if (gameBoard[location] === "" && !winner) {
      const newBoard = [...gameBoard];
      newBoard[location] = turn;
      setGameBoard(newBoard);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else {
        setTurn(turn === "X" ? "O" : "X");
      }
    }
  };

  const isBoardFull = gameBoard.every((cell) => cell !== "");

  const checkWinner = (board) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setGameBoard(["", "", "", "", "", "", "", "", ""]);
    setTurn("");
    setWinner("");
    setPlayerName(""); // Limpiar el nombre del jugador al reiniciar
  };

  return (
    <div className="container">
      <div className="menu">
        <h1>Tic-Tac-Toe</h1>
        <Announcement winner={winner} isBoardFull={isBoardFull} />
        <ResetButton reset={resetBoard} />
        <div>
          <button onClick={() => Weapon("X")}>Start as X</button>
          <button onClick={() => Weapon("O")}>Start as O</button>
        </div>
        {/* Espacio para que el jugador añada su nombre */}
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      {gameBoard.map((value, i) => (
        <Tile
          key={i}
          location={i}
          value={value}
          updateBoard={updateBoard}
          turn={turn}
        />
      ))}
    </div>
  );
};

export default Home;
