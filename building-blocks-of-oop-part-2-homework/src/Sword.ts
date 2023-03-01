import { Weapon } from "./Weapon";

export class Sword extends Weapon {
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super('sword', baseDamage, baseDurability, value, weight);
    }

    polish() {
        if (this.damageModifier <= (this.baseDamage / 4) - Weapon.MODIFIER_CHANGE_RATE) {
            this.damageModifier += Weapon.MODIFIER_CHANGE_RATE
        }
    }
}
