package models.vehicle;

import models.traffic.Intersection;

public class StandardVehicle extends Vehicle {

    public StandardVehicle(String id, int speed, Intersection intersection) {
        super(id, speed, 0, intersection);
    }

    @Override
    public void move() {
        System.out.println("[Car " + id + "] moving at speed " + speed);
    }

    @Override
    public void stop() {
        System.out.println("[Car " + id + "] STOPPED at red light");
    }

    @Override
    public void update(String message) {
        switch (message) {
            case "RED":
                stop();
                break;
            case "GREEN":
                move();
                break;
            case "YELLOW":
                System.out.println("[Car " + id + "] slowing down...");
                break;
        }
    }
}