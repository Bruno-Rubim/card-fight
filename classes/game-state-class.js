export class GameState {
    constructor({players = []}){
        this.players = players;
        this.baseDice = 6;
        this.bodyCards = [true, true, true, true, true]
        this.alive = true;
    }
    checkLivingPlayers = () => {
        let result = []
        this.players.forEach(player => {
            if (player.checkAlive()){
                result.push(player);
            }
        });
        return result;
    }
}