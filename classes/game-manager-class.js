import { Player } from "./player-class.js";

export class GameManager {
    constructor({gameState = null}){
        this.gameState = gameState;
    }
    hitHandler = (attacker = new Player(), victim = new Player(), hits) => {
        let attackData = {
            attacker: attacker,
            victim: victim,
            hits: hits,
            cancelAttack: false
        }
        let filters = [];
        victim.cards.forEach(card => {
            if (card.effectTrigger == 'been-hit') {
                filters.push(card.effect);
            }
        });

        filters.forEach(filter => {
            filter(attackData);
        });

        if (attackData.cancelAttack){
            this.cancelAttack();
            return;
        }
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