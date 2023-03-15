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
        const cost = this.weight * shipper.getCost();
        return `Shipment ID: ${this.shipmentID}, From: ${this.fromAddress}, ${this.fromZipCode}, To: ${this.toAddress}, ${this.toZipCode}, Cost: $${cost.toFixed(2)}`;
    }

    public static getInstance() {
        if (!Shipment.instance) {
          Shipment.instance = new Shipment(0, 10, "123 Main St", "12345", "456 State St", "67890");
        }
        return Shipment.instance;
      }

    getShipmentID() {
        return ++this.shipmnetCount;
    }
}
