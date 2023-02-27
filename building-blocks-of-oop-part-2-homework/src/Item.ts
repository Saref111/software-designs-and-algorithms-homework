import { Comparable } from "./Comparable";

export class Item implements Comparable<Item> {
    static idCounter: number = 0;
    readonly name: string;
    value: number;
    weight: number;
    private readonly id: number;

    constructor(name: string, value: number, weight: number) {
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.id = Item.idCounter;
        Item.idCounter++;
    }

    static resetIdCounter() {
        Item.idCounter = 0;
    }

    use() {

    }

    compareTo(other: Item): number {
        switch (true) {
            case this.value > other.value:
                return 1;
            case this.value < other.value:
                return -1;
            case this.name.toLowerCase() > other.name.toLocaleLowerCase():
                return 1;
            case this.name.toLowerCase() < other.name.toLocaleLowerCase():
                return -1;        
            default:
                return 0;
        }   
    }

    toString(): string {
        return `${this.name} - Value: ${this.value}, Weight: ${this.weight}`;
    }

    getId(): number {
        return this.id;
    }
}
