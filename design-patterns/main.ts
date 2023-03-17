import { Shipment } from "./Shipment";

class Client {
    public static main(): void {
      const shipment = Shipment.getInstance();
      console.log(shipment.ship());
    }
  }
  
  Client.main();
