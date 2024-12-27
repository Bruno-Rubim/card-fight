import Player from "./player.js"

class GameState {
    constructor(){
        this.players = [...Array(2)].map((_, i) => {
            return new Player({
                id: i,
                cards: []
            })
        })
    }
}

export default GameState