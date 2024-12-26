export class Card {
    constructor({type = null, name = '', effectTrigger = '', triggerHandler = null}){
        this.type = type;
        this.name = name;
        this.effectTrigger = effectTrigger;
        this.imageSrc = '../images/' + this.type + '-cards/' + this.name + '.png';
    }
}