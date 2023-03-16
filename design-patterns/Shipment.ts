import { Shipper } from "./Shipper";

export class Shipment {
    protected static instance: Shipment;
    protected shipmnetCount = 0;

    protected shipmentID: number;
    protected weight: number;
    protected fromAddress: string;
    protected fromZipCode: string;
    protected toAddress: string;
    protected toZipCode: string;

    protected constructor(shipmentID: number, weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
        this.shipmentID = shipmentID || this.getShipmentID();
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode;
    }

    public ship(): string {
        const shipper = new Shipper(this.fromZipCode);
        const cost = shipper.getCost(this);
        return `Shipment ID: ${this.shipmentID}, From: ${this.fromAddress}, ${this.fromZipCode}, To: ${this.toAddress}, ${this.toZipCode}, Cost: $${cost.toFixed(2)}`;
    }

    public getWeight(): number {
        return this.weight;
    }

    public static getInstance() {
        if (Shipment.instance) return Shipment.instance;

        const [shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode] = [0, 1, "123 Main St", "12345", "456 Main St", "45678"];
        
        // if (weight > 160) Shipment.instance = new Oversized(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
        // else if (weight > 15) Shipment.instance = new Package(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
        // else Shipment.instance = new Letter(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
     
        switch (weight) {
            case Math.min(weight, 15):
                Shipment.instance = new Letter(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
                break;
            case Math.min(weight, 160):
                Shipment.instance = new Package(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
                break;
            default:
                Shipment.instance = new Oversized(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
            }
        return Shipment.instance;
    }

    getShipmentID() {
        return ++this.shipmnetCount;
    }
}

export class Package extends Shipment {
    constructor(shipmentID: number, weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
        super(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
    }
}

export class Letter extends Shipment {
    constructor(shipmentID: number, weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
        super(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
    }
}

export class Oversized extends Shipment {
    constructor(shipmentID: number, weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
        super(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
    }
}
