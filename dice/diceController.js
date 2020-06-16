import { D4, D6, D8, D20 } from './dice.js';

const diceByString = {
    "D4" : D4,
    "D6" : D6,
    "D8" : D8,
    "D20" : D20,
}

class DiceController {
    constructor(scene, width, height) {
        this.scene = scene;
        this.dimensions = { height, width };
        this.diceList = [];
    }

    addDie(type, colorHex = 0x00FF00) {
        const dieClass = diceByString[type];
        const newDie = new dieClass(this.scene, colorHex);
        //move die
        newDie.startRoll();
        this.diceList.push(newDie);
    }

    tick() {
        this.diceList.forEach(c => c.tick());
    }

}

export default DiceController;