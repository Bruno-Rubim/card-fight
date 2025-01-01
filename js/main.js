import { drawPlayerCards } from "./interface.js";
import Card from "./model/card.js";
import GameState from "./model/game-state.js";
import Player from "./model/player.js";

const gameState = new GameState();

const combatBoots = new Card({name: 'combatBoots', type: 'item'}) 
const prosthetics = new Card({name: 'prosthetics', type: 'instant'}) 
const colorblindSpider = new Card({name: 'colorblindSpider', type: 'creature'})

const player1 = new Player({id: 0, activeCards: [combatBoots, prosthetics]})

const player2 = new Player({id: 1, activeCards: [colorblindSpider]})

gameState.players = [player1, player2]

gameState.players.forEach(player => drawPlayerCards(player))
