export class Shipment {
    protected static instance: Shipment;

    private shipmentID: number;
    private weight: number;
    private fromAddress: string;
    private fromZipCode: string;
    private toAddress: string;
    private toZipCode: string;

    protected constructor(shipmentID: number, weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
        this.shipmentID = shipmentID || this.getShipmentID();
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode;
    }

    public ship(): string {
        const cost = this.weight * 0.39;
        return `Shipment ID: ${this.shipmentID}, From: ${this.fromAddress}, ${this.fromZipCode}, To: ${this.toAddress}, ${this.toZipCode}, Cost: $${cost.toFixed(2)}`;
    }

    public static getInstance(shipmentID: number, weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
        if (!Shipment.instance) {
          Shipment.instance = new Shipment(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode);
        }
        return Shipment.instance;
      }

    protected shipmnetCount = 0;
    getShipmentID() {
        return ++this.shipmnetCount;
    }
}
