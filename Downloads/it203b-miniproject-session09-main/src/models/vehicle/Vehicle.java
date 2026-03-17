package models.vehicle;

import models.traffic.Intersection;
import pattern.observer.Observer;
import pattern.state.TrafficLight;

public abstract class Vehicle implements Runnable, Observer {
    private String id;
    private String modelName;
    private int priority;

    public Vehicle(String id, String modelName, int priority) {
        this.id = id;
        this.modelName = modelName;
        this.priority = priority;
    }

    abstract public void move();

    abstract public void stop();

    @Override
    public void run() {
        Intersection.getInstance().arrive(this);
    }

    @Override
    public void update(TrafficLight light) {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }
}