package engine;

import models.traffic.Intersection;
import models.vehicle.Vehicle;
import pattern.factory.VehicleFactory;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.Random;

public class SimulationEngine {

    private final Intersection intersection;
    private final ExecutorService executor;

    public SimulationEngine() {
        this.intersection = Intersection.getInstance();
        this.executor = Executors.newFixedThreadPool(10);
    }

    public void start() {
        generateVehicles();
    }

    private void generateVehicles() {
        new Thread(() -> {
            int count = 1;
            Random random = new Random();

            while (true) {
                try {
                    Vehicle vehicle = VehicleFactory.createVehicle("V" + count++, intersection);

                    executor.submit(vehicle);

                    System.out.println("[Hệ thống] Tạo xe: " + vehicle.getId());

                    Thread.sleep(500 + random.nextInt(500));

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}