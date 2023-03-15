abstract class AbstractShipper {
    public abstract getCost(): number;
}

class AirEastShipper extends AbstractShipper {
    private static instance: AirEastShipper;
    private shipmentCount = 0;
    private name = "Air East";
    private location = "Atlanta";
    private costPerOunce = 0.39;

    private constructor() { 
        super();
    }
    public static getInstance(): AirEastShipper {
        if (!AirEastShipper.instance) {
            AirEastShipper.instance = new AirEastShipper();
        }
        return AirEastShipper.instance;
    }
    public getCost(): number {
        return this.costPerOunce;
    }
}
class ChicagoSprintShipper extends AbstractShipper {
    private static instance: ChicagoSprintShipper;
    private shipmentCount = 0;
    private name = "Chicago Sprint";
    private location = "Chicago";    
    private costPerOunce = 0.42;

    private constructor() { 
        super();
    }
    public static getInstance(): ChicagoSprintShipper {
        if (!ChicagoSprintShipper.instance) {
            ChicagoSprintShipper.instance = new ChicagoSprintShipper();
        }
        return ChicagoSprintShipper.instance;
    }
    public getCost(): number {
        return this.costPerOunce;
    }
}

class PacificParcelShipper extends AbstractShipper {
    private static instance: PacificParcelShipper;
    private shipmentCount = 0;
    private name = "Pacific Parcel";
    private location = "San Diego";
    private costPerOunce = 0.51; 

    private constructor() { 
        super();
    }
    public static getInstance(): PacificParcelShipper {
        if (!PacificParcelShipper.instance) {
            PacificParcelShipper.instance = new PacificParcelShipper();
        }
        return PacificParcelShipper.instance;
    }
    public getCost(): number {
        return this.costPerOunce;
    }
}

export class Shipper {
    private shipper: AbstractShipper;
    constructor(zipCode: string) {
        switch (zipCode[0]) {
            case "1":
            case "2":
            case "3":
                this.shipper = AirEastShipper.getInstance();
                break;
            case "4":
            case "5":
            case "6":
                this.shipper = ChicagoSprintShipper.getInstance();
                break;
            case "7":
            case "8":
            case "9":
                this.shipper = PacificParcelShipper.getInstance();
                break;
            default:
                this.shipper = AirEastShipper.getInstance();
        }
    }
    public getCost(): number {
        return this.shipper.getCost();
    }
}
