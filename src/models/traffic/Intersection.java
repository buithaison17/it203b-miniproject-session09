package models.traffic;

import models.vehicle.Vehicle;
import pattern.state.TrafficLight;

import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;

public class Intersection {
    private BlockingDeque<Vehicle> queue = new LinkedBlockingDeque<>();
    private TrafficLight trafficLight;

    public Intersection(TrafficLight trafficLight) {
        this.trafficLight = trafficLight;
    }



}
