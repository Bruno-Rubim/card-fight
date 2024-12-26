export class Card {
    constructor({type = null, name = '', effectTrigger = '', effect = null}){
        this.type = type;
        this.name = name;
        this.effectTrigger = effectTrigger;
        this.effect = effect;
        this.imageSrc = '../images/' + this.type + '-cards/' + this.name + '.png';
    }
}