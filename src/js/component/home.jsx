import React, { useState } from "react";
import Tile from "/src/js/component/Tile.jsx";
import Announcement from "/src/js/component/Announcement.jsx";
import ResetButton from "/src/js/component/ResetButton.jsx";
import "../../styles/index.css";

const Home = () => {
  // Almacenar el estado actual del tablero del juego, el turno y el ganador.

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
  const [turn, setTurn] = useState(""); // El jugador cuyo turno es actualmente ("X" o "O")
  const [winner, setWinner] = useState(""); // El jugador ganador ("X", "O")

  // Función para establecer el Arma para comenzar el juego
  const Weapon = (startWeapon) => {
    setTurn(startWeapon);
  };

  // Función para manejar el click en una celda del tablero
  const updateBoard = (location) => {
    // Verificar si la celda está vacía y no hay ganador
    if (gameBoard[location] === "" && !winner) {
      const newBoard = [...gameBoard]; //Crea una copia nueva del array gameBoard
      newBoard[location] = turn; // Colocar el símbolo del jugador actual en la celda
      setGameBoard(newBoard); // Actualizar el tablero

      const newWinner = checkWinner(newBoard); // Verificar si hay un ganador
      if (newWinner) {
        setWinner(newWinner); // Establecer al ganador si lo hay
      } else {
        setTurn(turn === "X" ? "O" : "X"); // Alternar el turno entre "X" y "O"
      }
    }
  };
  const isBoardFull = gameBoard.every((cell) => cell !== ""); // Verificar si todas las celdas están llenas

  // Función para verificar si hay un ganador basado en patrones de victoria predefinidas
  const checkWinner = (board) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Retorna "X" o "O", el jugador ganador
      }
    }
    return null; // Si no hay ganador
  };

  // Función para reiniciar el juego
  const resetBoard = () => {
    setGameBoard(["", "", "", "", "", "", "", "", ""]); // Reiniciar el tablero
    setTurn(""); // Reiniciar el turno a vacío
    setWinner(""); // Reiniciar el ganador
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
