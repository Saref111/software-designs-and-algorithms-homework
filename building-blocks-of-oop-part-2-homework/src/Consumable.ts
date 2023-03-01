import { Item } from "./Item";

export class Consumable extends Item {
    isConsumed: boolean = false;
    private _isSpoiled: boolean;
    
    constructor(name: string, value: number, weight: number, isSpoiled: boolean) {
        super(name, value, weight);
        this._isSpoiled = isSpoiled;
    }

    use() {
        if (this.isConsumed) {
            return `There's nothing left of the ${this.name} to consume.`;
        }

        return `You consumed the ${this.name}.${this.isSpoiled() ? '\nYou feel sick.' : ''}`;
    }

    isSpoiled() {
        return this._isSpoiled;
    }
}
