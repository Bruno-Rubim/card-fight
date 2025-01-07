class Card {
    constructor({
        name = '',
        type = '',
        condition = '',
        effect = function(){}
    }){
        this.name = name;
        this.type = type;
        this.condition = condition;
        this.effect = effect;
    }
}

export default Card
