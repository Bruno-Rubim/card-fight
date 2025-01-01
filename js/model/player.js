import { LEFT_FOOT, RIGHT_FOOT, LEFT_HAND, RIGHT_HAND, FACE } from "../constants.js";
import Card from "./card.js";

class Player {
    constructor({
        id = 0,
        color = '',
        activeCards = [new Card({})],
    }){
        this.id = id;
        this.color = color;
        this.activeCards = activeCards;
        this.bodyCards = {
            [LEFT_FOOT]: true,
            [RIGHT_FOOT]: true,
            [LEFT_HAND]: true,
            [RIGHT_HAND]: true,
            [FACE]: true,
        }
    }
}
export default Player