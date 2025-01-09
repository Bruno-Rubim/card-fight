import { 
    ATTACK_DICE_FACES, 
    LEFT_FOOT, 
    RIGHT_FOOT, 
    LEFT_HAND, 
    RIGHT_HAND, 
    FACE, 
    MISS, 
    LOOT, 
    CRITICAL_HIT, 
    HEAVY_HIT, 
    LIGHT_HIT, 
    BODY_PARTS 
} from "../constants.js";
import { countValueInArray, findObjectWithValueArray, removeAllValueFromArray, removeSomeValueFromArray } from "../general-commands.js";
import * as buttonManager from "../button-manager.js"
import * as graphics from "../graphics/index.js"
import gameState from "../game-state.js";
import Player from "./player.js";
import { rerollDie, rerollHit, rollDiceSet } from "../combat.js";

export class Attack {
    constructor({attacker = new Player(), victim = new Player(), diceSet = [], actionSet = []}){
        this.attacker = attacker
        this.victim = victim
        this.diceSet = diceSet
        this.actionSet = actionSet
        this.selectedFace = ''
        this.currentHitType = ''
        this.currentHitFace = ''
        this.currentHitBodyPart = ''
        this.currentHitCancel = false
        this.hitsStruck = 0
        this.actionSet.reroll = 0
        this.additionalDice = 0
    }

    checkImpossibleHits(){
        let setChanged = false;
    
        if (findObjectWithValueArray(this.victim.activeCards, 'type', 'creature')){
            false
        }

        for(const i in BODY_PARTS){
            if (!this.victim.bodyCards[BODY_PARTS[i]] && 
                this.actionSet[BODY_PARTS[i]] != MISS && 
                this.actionSet[BODY_PARTS[i]] != CRITICAL_HIT)
                {
                    rerollHit(this.diceSet, BODY_PARTS[i])
                    setChanged = true;
                }
            }
        return setChanged;
    }

    translateDiceToActions(){
        let minLight = 3;
        let minHeavy = 4;
        let minCritical = 5;
        
        this.actionSet[LEFT_FOOT] = MISS;
        this.actionSet[RIGHT_FOOT] = MISS;
        this.actionSet[LEFT_HAND] = MISS;
        this.actionSet[RIGHT_HAND] = MISS;
        this.actionSet[FACE] = MISS;
        this.actionSet[LOOT] = 0;
        
        for(let i = 0; i < ATTACK_DICE_FACES.length - 1; i++){
            let amount = countValueInArray(this.diceSet, ATTACK_DICE_FACES[i])
            if (amount >= minCritical) {
                this.actionSet[ATTACK_DICE_FACES[i]] = CRITICAL_HIT;
            } else if (amount >= minHeavy) {
                this.actionSet[ATTACK_DICE_FACES[i]] = HEAVY_HIT;
            } else if (amount >= minLight) {
                this.actionSet[ATTACK_DICE_FACES[i]] = LIGHT_HIT;
            } else {
                this.actionSet[ATTACK_DICE_FACES[i]] = MISS
            }
        }
        if (this.checkImpossibleHits()){
            this.translateDiceToActions()
        }
        this.actionSet[LOOT] = Math.floor(countValueInArray(this.diceSet, LOOT)/2);
    }

    performAttack(){
        gameState.checkPlayerCardConditions(this.attacker, 'calculate-dice')
        this.diceSet = rollDiceSet(this.attacker.baseDice + this.additionalDice);
        this.translateDiceToActions();
    }

    handleAction(){
        this.translateDiceToActions()

        graphics.drawPlayerCards(this.victim)
        graphics.drawPlayerCards(this.attacker)
        
        buttonManager.deletePlayerButtons(this.attacker)
        buttonManager.deleteSelection(this)

        buttonManager.createDiceButtons(this)
        
        gameState.checkPlayerActions(this)
        gameState.requestPlayerActions(this)
    }

    handleHitBody(targetCard, type, face = targetCard){
        this.currentHitBodyPart = targetCard
        this.currentHitFace = face
        this.currentHitType = type
        this.currentHitCancel = false
        gameState.checkPlayerCardConditions(this.victim, 'hit-attempt')
        this.diceSet = removeAllValueFromArray(this.diceSet, face)
        if (!this.currentHitCancel){
            this.victim.bodyCards[targetCard] = false;
            this.hitsStruck++
            gameState.checkPlayerCardConditions(this.victim, 'been-hit')
            gameState.checkPlayerCardConditions(this.attacker, 'strike-hit')
        }
        this.handleAction()
    }

    handleHitCreature(cardName = '', type, face){
        const card = findObjectWithValueArray(this.victim.activeCards, 'name', cardName)
        this.currentHitCreature = card
        this.currentHitFace = face
        this.currentHitType = type
        this.currentHitCancel = false
        gameState.checkPlayerCardConditions(this.victim, 'creature-hit')
        this.diceSet = removeAllValueFromArray(this.diceSet, face)
        if (!this.currentHitCancel){
            removeAllValueFromArray(this.victim.activeCards, card);
            this.hitsStruck++
            gameState.checkPlayerCardConditions(this.attacker, 'bust-creature')
            gameState.checkPlayerCardConditions(this.attacker, 'strike-hit')
        }
        this.handleAction()
    }

    handleReroll(face){
        rerollDie(this.diceSet, face);
        this.actionSet.reroll--
        this.handleAction()
    }

    handleLoot(cardName){
        for (let i = 0; i < this.victim.activeCards.length; i++){
            const card = this.victim.activeCards[i]
            if (card.name == cardName) {
                removeAllValueFromArray(this.victim.activeCards, card)
                this.attacker.activeCards.push(card);
            }
        }
        removeSomeValueFromArray(this.diceSet, LOOT, 2)
        this.handleAction()
    }
}