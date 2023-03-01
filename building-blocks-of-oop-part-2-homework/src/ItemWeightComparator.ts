import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class ItemWeightComparator implements ItemComparator {
    compare(first: Item, second: Item): number {
        switch (true) {
            case first.weight > second.weight:
                return 1;
            case first.weight < second.weight:
                return -1;        
            default:
                return first.compareTo(second);
        }
    }
}
