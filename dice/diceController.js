import { D4, D6, D8, D12, D20 } from './dice.js';

const diceByString = {
    "D4": D4,
    "D6": D6,
    "D8": D8,
    "D12": D12,
    "D20": D20,
}

function calculateCoorForSpiral(n) {
    const sqrt_n = Math.floor(Math.sqrt(n));
    const anchor_square_root = sqrt_n % 2 === 1 ? sqrt_n : sqrt_n - 1; // square root of the largest odd square less than n
    const anc_coor = (anchor_square_root - 1) / 2 // value of (anc_coor, -anc_coor) = anchor_square_root 

    const diff = n - anchor_square_root ** 2;

    if (diff === 0) return { x: anc_coor, y: -anc_coor };
    if (0 < diff && diff <= 2 * anc_coor + 2) {
        return { x: anc_coor + 1, y: diff - anc_coor - 1 };
    }
    if (2 * anc_coor + 2 < diff && diff <= 4 * anc_coor + 4) {
        return { x: - diff + 3 * anc_coor + 3, y: anc_coor + 1 };
    }
    if (4 * anc_coor + 4 < diff && diff <= 6 * anc_coor + 6) {
        return { x: -anc_coor - 1, y: + 5 * anc_coor + 5 - diff };
    }
    return { x: -7 * anc_coor - 7 + diff, y: -anc_coor - 1 };
}

class DiceController {
    constructor(scene, width, height) {
        this.scene = scene;
        this.dimensions = { height, width };
        this.diceList = [];
    }

    addDie(type, onRollEnd ,colorHex = 0x00FF00) {
        const dieClass = diceByString[type];
        const newDie = new dieClass(this.scene, onRollEnd ,colorHex);
        const n = this.diceList.push(newDie);
        const { x, y } = calculateCoorForSpiral(n)
        newDie.setPosition( {x , y} )
        newDie.startRoll();
    }

    reroll() {
        this.diceList.forEach(c => c.startRoll())
    }

    tick() {
        this.diceList.forEach(c => c.tick());
    }

}

export default DiceController;