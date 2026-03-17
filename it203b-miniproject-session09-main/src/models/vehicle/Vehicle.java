package models.vehicle;

import models.traffic.Intersection;
import pattern.observer.Observer;

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
    public void update(String message) {
        if (message.equals("RED")) {
            stop();
        } else if (message.equals("GREEN")) {
            move();
        } else if (message.equals("YELLOW")) {
            System.out.println("[" + id + "] slowing down...");
        }
    }

    public String getId() {
        return id;
    }

    public int getPriority() {
        return priority;
    }
}