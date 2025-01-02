import { LEFT_FOOT, RIGHT_FOOT, LEFT_HAND, RIGHT_HAND, FACE } from "../constants.js";
import Card from "./card.js";

class Player {
    constructor(){
        this.id = 0;
        this.activeCards = [];
        this.baseDice = 6
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
