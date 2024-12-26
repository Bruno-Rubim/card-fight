export class gameManager {
    constructor({gameState = null}){
        this.gameState = gameState;
    }
    hitHandler = (attacker, victim, hit) => {

    }
    performWin = (player) => {
        console.log('Player ' + player.id + ' won!')
    }
    checkWinCondition = () => {
        if (this.gameState.checkLivingPlayers().length == 1) {
            this.performWin(this.gameState.checkLivingPlayers[0]);
        }
    }
}