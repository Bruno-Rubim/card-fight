import { Player } from "./player-class.js";
import * as combat from "../combat.js";

export class GameManager {
    constructor({gameState = null}){
        this.gameState = gameState;
    }
    
    getCardsEffectsTrigger = (player = new Player(), tirgger = '') => {
        let effects = [];
        player.cards.forEach(card => {
            if (card.effectTrigger == tirgger) {
                effects.push(card.effect);
            }
        });
        return effects
    }

    attackHandler = (attacker = new Player(), victim = new Player()) => {
        let attackData = {
            attacker: attacker,
            victim: victim,
            cancelAttack: false,
            extraDice: 0
        }

        let effects = this.getCardsEffectsTrigger(attacker, 'attack');
        effects.forEach(effect => {
            effect(attackData);
        });

        let diceSet = combat.rollDiceSet(attacker.baseDice + attackData.extraDice);
        let hits = combat.checkHits(diceSet, victim);
        console.log(diceSet);
        console.log(hits);

        let lootCount = Math.floor(combat.countInSet(5, diceSet) / 2);        
        this.lootHandler(attacker, victim, lootCount);
        
        this.hitHandler(attacker, victim, hits);

        if (attackData.cancelAttack){
            this.cancelAttack();
            return;
        } 
    }

    hitHandler = (attacker = new Player(), victim = new Player(), hits) => {
        let attackData = {
            attacker: attacker,
            victim: victim,
            hits: hits,
            cancelAttack: false
        }

        let effects = this.getCardsEffectsTrigger(victim, 'been-hit');

        effects.forEach(effect => {
            effect(attackData);
        });
        if (attackData.cancelAttack){
            this.cancelAttack();
            return;
        } else {
            for (let i = 0; i < attackData.hits.length; i++) {
                if (attackData.hits[i]) {
                    victim.bodyCards[i] = false;
                }

            }
        }
    }

    lootHandler = (attacker = new Player(), victim = new Player(), loots) => {
        let attackData = {
            attacker: attacker,
            victim: victim,
            loots: loots,
            cancelAttack: false,
            cancelSteal: false,
        }
        
        let effects = this.getCardsEffectsTrigger(attacker, 'steal');
        effects.push(...this.getCardsEffectsTrigger(victim, 'been-stolen'));
        
        for (let i = 0; i < victim.cards.length && loots > 0; i++) {
            if (victim.cards[i].type == 'item') {
                effects.forEach(effect => {
                    effect(attackData);
                });
                loots--;
                attacker.cards.push(victim.cards[i]);
                victim.cards.splice(i, 1);
            }
        }
        console.log(victim);
    }

    performWin = (player) => {
        console.log('Player ' + player.id + ' won!')
    }
    
    cancelAttack = () => {
        console.log('Canceled!');
    }
    
    checkWinCondition = () => {
        if (this.gameState.checkLivingPlayers().length == 1) {
            this.performWin(this.gameState.checkLivingPlayers[0]);
        }
    }
}