import { Shipment } from "./Shipment";

class Client {
    public static main(): void {
      const shipment = Shipment.getInstance(0, 10, "123 Main St", "12345", "456 State St", "67890");
      console.log(shipment.ship());
    }
  }
  
  Client.main();
