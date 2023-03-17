import { Shipper } from "./Shipper";

export const MaxWeight = {
    PACKAGE: 160,
    LETTER: 15,
}

export class Shipment {
    protected static instance: Shipment;
    protected shipmnetCount = 0;

    shipmentID: number;
    weight: number;
    fromAddress: string;
    fromZipCode: string;
    toAddress: string;
    toZipCode: string;

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

    public static getInstance() {
        if (Shipment.instance) return Shipment.instance;

        const [
            shipmentID, 
            weight, 
            fromAddress, 
            fromZipCode, 
            toAddress, 
            toZipCode
        ] = [0, 17, "123 Main St", "12345", "456 Main St", "45678"];
        const [fragile, doNotLeave ,returnReceipt] = [true, true, true];
        
        // if (weight > 160) Shipment.instance = new Oversized(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
        // else if (weight > 15) Shipment.instance = new Package(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
        // else Shipment.instance = new Letter(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
     
        switch (weight) {
            case Math.min(weight, MaxWeight.LETTER):
                Shipment.instance = new Letter(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
                break;
            case Math.min(weight, MaxWeight.PACKAGE):
                Shipment.instance = new Package(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
                break;
            default:
                Shipment.instance = new Oversized(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
        }

        if (fragile) Shipment.instance = new FragileDecorator(Shipment.instance);
        if (doNotLeave) Shipment.instance = new DoNotLeaveDecorator(Shipment.instance); 
        if (returnReceipt) Shipment.instance = new ReturnReceiptDecorator(Shipment.instance);

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


class FragileDecorator extends Shipment {
    protected decoratedShipment: Shipment;
    constructor(shipment: Shipment) {
        super(shipment.shipmentID, shipment.weight, shipment.fromAddress, shipment.fromZipCode, shipment.toAddress, shipment.toZipCode);
        this.decoratedShipment = shipment;
    }

    public ship(): string {
        return ` ${this.decoratedShipment.ship()} \n **MARK FRAGILE**`;
    }
}

class DoNotLeaveDecorator extends Shipment {
    protected decoratedShipment: Shipment;
    constructor(shipment: Shipment) {
        super(shipment.shipmentID, shipment.weight, shipment.fromAddress, shipment.fromZipCode, shipment.toAddress, shipment.toZipCode);
        this.decoratedShipment = shipment;
    }

    public ship(): string {
        return ` ${this.decoratedShipment.ship()} \n **MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**`;
    }
}

class ReturnReceiptDecorator extends Shipment {
    protected decoratedShipment: Shipment;
    constructor(shipment: Shipment) {
        super(shipment.shipmentID, shipment.weight, shipment.fromAddress, shipment.fromZipCode, shipment.toAddress, shipment.toZipCode);
        this.decoratedShipment = shipment;
    }

    public ship(): string {
        return ` ${this.decoratedShipment.ship()} \n ***MARK RETURN RECEIPT REQUESTED**`;
    }
}
