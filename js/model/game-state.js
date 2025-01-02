import { drawPlayerCards } from "../graphics/index.js"
import Player from "./player.js"

class GameState {
    constructor(){
        this.players = [...Array(2)].map((_, i) => {
            return new Player({
                id: i,
                activeCards: []
            })
        })
    }
    drawPlayers(){
        this.players.forEach(player => {
            drawPlayerCards(player)
        }) 
    }
}

export default new GameState()

/*

Different game phases

player turn {
    
    activate/deactivate cards from hand (optional)
    
    draw card options
    
    select card from options
    
    activate/deactivate cards from hand (optional)
    
    select opponent

    calculate dice set

    roll dice set
    
    reroll impossible hits
    
    reroll dice (optional)

    perform actions

    next player's turn ->
}

Card triggers

reaction {

    Losing my last body card

    Being selected for an attack

    Losing any of my body cards

    Being looted

    Being struck by a light hit

    Any creature being busted

    Any instant card is activated

    Any explosion

    Any other player's turn starts
    
    Another player dies
    
    Any other player gets looted
}

Card effect conditions

item {
    have 'face' card

    have both 'hand' cards

    don't have any 'hand' cards
    
    don't have any 'feet' cards

    don't have any not 'hand' cards
    
    performing a hit

    get any 'head' hit

    number of opponent's item cards

    number of innactive card

    number of dice in attack is even

    number of non-busted body cards of opponent

    number of active creature cards in game

    number of dead players
}

creature {
    not striking any hit in a turn
    
    getting any heavy hit
    
    getting any self cards busted
    
    rolling a 'loot'

    number of cards in hand

    number of dice in attack is multiple of 3
    
    number of active item cards
    
    number of my busted body cards

    number of dead players

    number of living enemy players

    having only 1 'foot' card

    drawing card options

    opponent has 'face' card
}

*/
