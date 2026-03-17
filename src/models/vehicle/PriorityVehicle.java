package models.vehicle;

import models.traffic.Intersection;

public class PriorityVehicle extends Vehicle {

    public PriorityVehicle(String id, int speed, Intersection intersection) {
        super(id, speed, 1, intersection);
    }

    @Override
    public void move() {
        System.out.println("[Ambulance " + id + "] PRIORITY moving!");
    }

    @Override
    public void stop() {
        System.out.println("[Ambulance " + id + "] IGNORE RED LIGHT");
    }
}