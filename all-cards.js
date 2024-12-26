import { Card } from "./classes/card-class.js"

export const combatBoots = new Card({
	type: 'item',
	name: 'combat-boots',
	effectTrigger: 'been-hit',
    effect: (attackData) => {
        if (attackData.hits[3] == 'light') {
            attackData.hits[3] = false
            console.log('boot protect')
        }
        if (attackData.hits[4] == 'light') {
            attackData.hits[4] = false
            console.log('boot protect')
        }
    }
})

export const invisibleguitar = new Card({
	type: 'item',
	name: 'invisible-guitar',
	effectTrigger: 'attack',
    effect: (attackData) => {
        console.log(attackData)
        if (attackData.attacker.bodyCards[1] && attackData.attacker.bodyCards[2]){
            attackData.extraDice += 5;
        }
    }
})