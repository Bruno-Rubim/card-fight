import { LEFT_FOOT, RIGHT_FOOT, LEFT_HAND, RIGHT_HAND, FACE } from "../constants.js";

class Player {
    constructor(){
        this.id = 0;
        this.activeCards = [];
        this.baseDice = 6 //official value is 6
        this.baseDrawOptions = 3
        this.dead = false
        this.bodyCards = {
            [LEFT_FOOT]: true,
            [LEFT_HAND]: true,
            [FACE]: true,
            [RIGHT_HAND]: true,
            [RIGHT_FOOT]: true,
        }
    }
}
export default Player
