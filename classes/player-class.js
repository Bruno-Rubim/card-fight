export class Player {
    constructor({cards = [], color = 'red', id = 0}){
        this.cards = cards;
        this.baseDice = 6;
        this.color = color
        this.bodyCards = [true, true, true, true, true];
        this.id = id;
    }
    checkAlive = () => {
        let result = false;
        this.bodyCards.forEach(bodyCard => {
            if (bodyCard == true) {
                result = true;
            }
        });
        this.alive = result;
        return result;
    }
}