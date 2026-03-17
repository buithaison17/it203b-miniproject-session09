package models.vehicle;

import models.traffic.Intersection;
import pattern.observer.Observer;
import pattern.state.TrafficLight;

public abstract class Vehicle implements Runnable, Observer {

    protected String id;
    protected int speed;
    protected int priority;
    protected Intersection intersection;

    public Vehicle(String id, int speed, int priority, Intersection intersection) {
        this.id = id;
        this.speed = speed;
        this.priority = priority;
        this.intersection = intersection;
    }

    public abstract void move();
    public abstract void stop();

    @Override
    public void run() {
        intersection.arrive(this);
    }

    @Override
    public void update(TrafficLight light) {
        if (light.getCurrentState().equals("RED")) {
            stop();
        } else {
            move();
        }
    }

    public String getId() {
        return id;
    }

    public int getPriority() {
        return priority;
    }
}