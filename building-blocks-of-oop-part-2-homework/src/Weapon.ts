import {Item} from './Item'

export abstract class Weapon extends Item {
    static MODIFIER_CHANGE_RATE: number = 0.05;
    protected baseDamage: number;
    protected damageModifier: number = 0;
    protected durabilityModifier: number = 0;
    private baseDurability: number;

    constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(name, value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
    }

    getEffectiveDamage(): number {
        return this.baseDamage + this.damageModifier;   
    }

    getEffectiveDurability(): number;
    getEffectiveDurability(durabilityModifier?: number): number {
        return this.baseDurability + (durabilityModifier || this.durabilityModifier);
    };

    toString(): string {
        return `${super.toString()}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(this.getEffectiveDurability() * 100).toFixed(2)}%`
    }

    use(): string {
        if (this.baseDurability <= 0) {
            return `You can't use the ${this.name}, it is broken.`
        }
        this.baseDurability = this.baseDurability - Weapon.MODIFIER_CHANGE_RATE
        return `You use the ${this.name}, dealing ${this.getEffectiveDamage()} points of damage.${this.baseDurability <= 0 ? `\nThe ${this.name} breaks.` : ''}`
    }
}
