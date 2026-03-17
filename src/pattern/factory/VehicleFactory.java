package pattern.factory;

import models.traffic.Intersection;
import models.vehicle.*;

import java.util.Random;

public class VehicleFactory {

    private static final Random rand = new Random();

    public static Vehicle createVehicle(String id, Intersection intersection) {
        int type = rand.nextInt(3);

        switch (type) {
            case 0:
                return new StandardVehicle(id, 40 + rand.nextInt(20), intersection);

            case 1:
                return new StandardVehicle(id, 30 + rand.nextInt(20), intersection);

            case 2:
                return new PriorityVehicle(id, 80 + rand.nextInt(20), intersection);

            default:
                return new StandardVehicle(id, 50, intersection);
        }
    }
}