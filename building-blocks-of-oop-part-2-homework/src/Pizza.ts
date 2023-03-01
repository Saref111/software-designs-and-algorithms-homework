import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
    numberOfSlices: number;
    private numberOfEatenSlices: number = 0;

    constructor(value: number, weight: number, numberOfSlices: number, isSpoiled: boolean = false) {
        super('pizza', value, weight, isSpoiled);
        this.numberOfSlices = numberOfSlices;
    }

    use() {
        if (this.numberOfSlices > 0) {
            this.numberOfSlices--;
            this.numberOfEatenSlices++;

            return `You consumed a slice of the pizza.`;
        }
        return `There's nothing left of the pizza to consume.`;
    }

    getNumberOfEatenSlices() {
        return this.numberOfEatenSlices;
    }
}
