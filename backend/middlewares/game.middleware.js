let gameState = {
  dice: Array(5).fill({ one: 1 }),
  heldDice: [false, false, false, false, false],
  rollCount: 0,
  scores: [{}, {}],
  currentPlayer: 0,
};

export const handleGameConnection = (socket, io) => {
  console.log("A user connected to the game");

  socket.emit("gameState", gameState);

  socket.on("updateGameState", (newGameState) => {
    gameState = newGameState;
    io.emit("gameState", gameState);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from the game");
  });
};
