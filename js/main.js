import { drawPlayerCards } from "./interface.js";
import GameState from "./model/game-state.js";

const gameState = new GameState();

drawPlayerCards(gameState.players[0])