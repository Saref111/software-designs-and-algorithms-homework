import { Oversized, Package, Shipment } from "./Shipment";

abstract class AbstractShipper {
    public abstract getCost(shipment: Shipment): number;
}

class AirEastShipper extends AbstractShipper {
    private static instance: AirEastShipper;
    private name = "Air East";
    private location = "Atlanta";

    private constructor() { 
        super();
    }
    public static getInstance(): AirEastShipper {
        if (!AirEastShipper.instance) {
            AirEastShipper.instance = new AirEastShipper();
        }
        return AirEastShipper.instance;
    }
    public getCost(shipment: Shipment): number {
        if (shipment instanceof Oversized) return 10 + 0.25 * shipment.getWeight();
        else if (shipment instanceof Package) return 0.25 * shipment.getWeight();
        return 0.39;
    }
}
class ChicagoSprintShipper extends AbstractShipper {
    private static instance: ChicagoSprintShipper;
    private name = "Chicago Sprint";
    private location = "Chicago"; 

    private constructor() { 
        super();
    }
    public static getInstance(): ChicagoSprintShipper {
        if (!ChicagoSprintShipper.instance) {
            ChicagoSprintShipper.instance = new ChicagoSprintShipper();
        }
        return ChicagoSprintShipper.instance;
    }
    public getCost(shipment: Shipment): number {
        if (shipment instanceof Oversized) throw new Error("No charge for oversized shipments");
        else if (shipment instanceof Package) return 0.2 * shipment.getWeight();
        return 0.42;
    }
}

class PacificParcelShipper extends AbstractShipper {
    private static instance: PacificParcelShipper;
    private name = "Pacific Parcel";
    private location = "San Diego";

    private constructor() { 
        super();
    }
    public static getInstance(): PacificParcelShipper {
        if (!PacificParcelShipper.instance) {
            PacificParcelShipper.instance = new PacificParcelShipper();
        }
        return PacificParcelShipper.instance;
    }
    public getCost(shipment: Shipment): number {
        if (shipment instanceof Oversized) return 0.21 * shipment.getWeight();
        else if (shipment instanceof Package) return 0.19 * shipment.getWeight();
        return 0.51;
    }
}

export class Shipper {
    private shipperInstance: AbstractShipper;
    constructor(zipCode: string) {
        switch (zipCode[0]) {
            case "1":
            case "2":
            case "3":
                this.shipperInstance = AirEastShipper.getInstance();
                break;
            case "4":
            case "5":
            case "6":
                this.shipperInstance = ChicagoSprintShipper.getInstance();
                break;
            case "7":
            case "8":
            case "9":
                this.shipperInstance = PacificParcelShipper.getInstance();
                break;
            default:
                this.shipperInstance = AirEastShipper.getInstance();
        }
    }
    public getCost(shipment: Shipment): number {
        return this.shipperInstance.getCost(shipment);
    }
}
