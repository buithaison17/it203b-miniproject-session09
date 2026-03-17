package pattern.factory;

import models.traffic.Intersection;
import models.vehicle.*;

import java.util.Random;
import java.util.List;

public class VehicleFactory {

    private static final Random rand = new Random();

    public static Vehicle createVehicle(String id, Intersection intersection) {

        List<String> types = List.of("STANDARD", "PRIORITY");
        String type = types.get(rand.nextInt(types.size()));

        switch (type) {
            case "STANDARD":
                return new StandardVehicle(id, 40 + rand.nextInt(20), intersection);

            case "PRIORITY":
                return new PriorityVehicle(id, 80 + rand.nextInt(20), intersection);

            default:
                return new StandardVehicle(id, 50, intersection);
        }
    }
}