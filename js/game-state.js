import { BODY_PARTS, LOOT, MISS } from "./constants.js"
import * as graphics from "./graphics/index.js"
import * as buttonManager from "./button-manager.js"
import { Attack } from "./model/attack.js"
import Player from "./model/player.js"
import { allCards } from "./card-list.js"
import Card from "./model/card.js"
import { removeAllValueFromArray, removeSomeValueFromArray } from "./general-commands.js"

class GameState {
    constructor(){
        this.players = [...Array(2)].map((_, i) => {
            return new Player({
                id: i,
                activeCards: []
            })
        })
        this.turnCounter = 0;
        this.currentAttack;
        this.activatedEffectsThisTurn = []
        this.attacksLeft = 1
        this.mainDeck = []
        this.renewelDeck = []
        this.cardOptions = []
    }

    startGame(){
        this.mainDeck = allCards.slice()
        buttonManager.createDrawButton(this.getPlayerTurn(0))
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

    drawCardOptions(){
        let i = 0;
        const player = this.getPlayerTurn(0)
        this.checkPlayerCardConditions(player, 'draw-options')
        if (player.baseDrawOptions > this.mainDeck.length){
            this.mainDeck = (this.mainDeck.concat(this.renewelDeck))
            this.renewelDeck = []
        }
        if (this.mainDeck.length == 0){
            console.log('no more cards')
            buttonManager.createAttackButton(this.getPlayerTurn(0))
            return
        }
        while (i < player.baseDrawOptions) {
            const j = Math.floor(Math.random() * this.mainDeck.length);
            const card = this.mainDeck[j]
            if (card == undefined){
                break
            }
            this.cardOptions.push(card)
            this.mainDeck.splice(j, 1)
            buttonManager.createCardOptionButton(player, card)
            i++
        }
    }

    cardOptionHandler(card = new Card()){
        removeAllValueFromArray(this.cardOptions, card)
        this.renewelDeck = (this.renewelDeck.concat(this.cardOptions))
        this.cardOptions = []
        this.getPlayerTurn(0).activeCards.push(card)
        graphics.drawPlayerCards(this.getPlayerTurn(0))
        buttonManager.deleteCardOptionButtons()
        buttonManager.createAttackButton(this.getPlayerTurn(0))
    }

    checkPlayerCardConditions(player = new Player(), condition = ''){
        for (let i = 0; i < player.activeCards.length; i++){
            const card = player.activeCards[i];
            if (card.condition == condition) {
                card.effect(this.currentAttack)
            }
        }
    }

    startAttack(){
        this.currentAttack = new Attack({attacker: this.getPlayerTurn(0), victim: this.getPlayerTurn(1)})
        this.attacksLeft--
        this.currentAttack.performAttack()
        buttonManager.createDiceButtons(this.currentAttack)
        this.checkPlayerActions(this.currentAttack)
        this.requestPlayerActions(this.currentAttack)
        this.drawPlayers()
    }

    endAttack(){
        buttonManager.deletePlayerButtons(this.getPlayerTurn(0))
        buttonManager.deleteDiceButtons(this.currentAttack)
        if (this.attacksLeft < 1) {
            this.nextTurn()
        } else {
            this.startAttack()
        }
    }

    requestPlayerActions(){
        this.currentAttack.translateDiceToActions()
    }

    checkPlayerActions(){
        let anyleft = false
        for(const part in BODY_PARTS){
            if (this.currentAttack.actionSet[BODY_PARTS[part]] != MISS){
                anyleft = true;
            }
        }
        if (this.currentAttack.actionSet[LOOT] > 0){
            for (let i = 0; i < this.currentAttack.victim.activeCards.length; i++){
                if (this.currentAttack.victim.activeCards[i].type == 'item'){
                    anyleft = true;
                }
            }
        }
        if (!anyleft) {
            this.checkPlayerCardConditions(this.getPlayerTurn(0), 'end-attack')
            buttonManager.createEndAttackButton(this.getPlayerTurn(0))
        }
    }

    nextTurn(){
        this.activatedEffectsThisTurn = []
        this.turnCounter++
        this.attacksLeft = 1;
        buttonManager.createDrawButton(this.getPlayerTurn(0))
    }

    checkPlayersAlive(){
        this.players.forEach(player => {
            let dead = true
            for(const part in player.bodyCards){
                if (player.bodyCards[part]){
                    dead = false
                }
            }
            player.dead = dead
        })
    }

    endGame(player = new Player()){
        graphics.endGame(player.id)
    }

    checkWinCondition(){
        this.checkPlayersAlive()
        const alivePlayers = []
        this.players.forEach(player => {
            if (!player.dead){
                alivePlayers.push(player)
            }
        })
        if (alivePlayers.length == 1) {
            this.endGame(alivePlayers[0])
        }
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
