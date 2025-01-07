import { BODY_PARTS, MISS } from "./constants.js"
import * as graphics from "./graphics/graphis-index.js"
import * as buttonManager from "./button-manager.js"
import { Attack } from "./model/combat.js"
import Player from "./model/player.js"

class GameState {
    constructor(){
        this.players = [...Array(2)].map((_, i) => {
            return new Player({
                id: i,
                activeCards: []
            })
        })
        this.turnCounter = 0;
    }

    startGame(){
        buttonManager.createAttackButton(this.getPlayerTurn(0))
        this.drawPlayers()
    }

    getPlayerTurn(turnsSkip){
       const coutner = (this.turnCounter + turnsSkip) % this.players.length
        return this.players[coutner]
    }
    drawPlayers(){
        this.players.forEach(player => {
            graphics.drawPlayerCards(player)
        })
    }
    requestPlayerActions(attack = new Attack()){
        attack.translateDiceSet()
        buttonManager.createActionButtons(attack)
    }
    checkPlayerActions(attack = new Attack()){
        let anyleft = false
        for(const part in BODY_PARTS){
            if (attack.actionSet[BODY_PARTS[part]] != MISS &&
                attack.actionSet[BODY_PARTS[part]] != null 
            ){
                anyleft = true;
            }
        }
        if (!anyleft) {
            buttonManager.createEndAttackButton(this.getPlayerTurn(0))
        }
    }
    startCombat(){
        const attack = new Attack({attacker: this.getPlayerTurn(0), victim: this.getPlayerTurn(1)})
        attack.performAttack()
        graphics.drawDiceSet(attack.diceSet)
        this.checkPlayerActions(attack)
        this.requestPlayerActions(attack)
        this.drawPlayers()
    }
    nextTurn(){

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
