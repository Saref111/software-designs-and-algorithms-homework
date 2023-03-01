import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
    private items: Item[] = [];

    addItem(item: Item) {
        this.items.push(item);
    }

    sort(): void;
    sort(comparator?: ItemComparator) {
        this.items.sort(comparator ? comparator.compare : (a, b) => {
            return a.compareTo(b);
        })
    }

    toString(): string {
        return this.items.join(', ');
    }
}
