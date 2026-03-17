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

    // Xe bắt đầu đi vào tiến hành thêm vào hàng đợi
    public void arrive(Vehicle vehicle) {
        try {
            queue.put(vehicle);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    // Xử lý dừng đèn đỏ
    public void process(Vehicle vehicle) {

    }

    // Xử lý xe đi qua
    public void cross(Vehicle vehicle) {
    }

}
