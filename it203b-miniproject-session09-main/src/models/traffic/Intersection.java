package models.traffic;

import models.vehicle.Vehicle;
import pattern.state.TrafficLight;

import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;

public class Intersection {
    private static Intersection intersection;
    private BlockingDeque<Vehicle> queue = new LinkedBlockingDeque<>();
    private TrafficLight trafficLight = new TrafficLight();

    private Intersection() {
    }

    // Singleton pattern để không phải tạo lại
    // Synchronized dể đảm bảo các luồng khác không tạo cái mới
    public synchronized static Intersection getInstance() {
        if (intersection == null) {
            intersection = new Intersection();
        }
        return intersection;
    }

    // Xe bắt đầu đi vào tiến hành thêm vào hàng đợi
    public void arrive(Vehicle vehicle) {
        try {
            // Thêm vào hàng chờ
            queue.put(vehicle);
            // Dừng đèn đỏ
            process(vehicle);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    // Xử lý dừng đèn đỏ
    public synchronized void process(Vehicle vehicle) {
        // Nếu đèn đỏ và không phải xe ưu tiên phải dừng lại
        while (true) {
            // Lấy xe đầu hàng
            Vehicle head = queue.peek();
            // Kiểm tra đèn xanh
            boolean isGreenLight = trafficLight.getState().equals("GREEN");
            // Kiểm tra xe ưu tiên
            boolean isPriority = vehicle.getPriority() == 1;
            // Đang đừng ở đầu hàng và đèn xanh hoặc là xe ưu tiên thì di chuyển
            if ((head == vehicle && isGreenLight) || isPriority) {
                break;
            }
            // Đợi nếu như không phải
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        // Cho xe di chuyển và xóa khỏi hàng đợi
        cross(vehicle);
        queue.remove(vehicle);
        // Đánh thức các xe khác
        notifyAll();
    }

    // Xử lý xe đi qua
    public void cross(Vehicle vehicle) {
        vehicle.move();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    // Khi đèn xanh cho tất cả các xem di chuyển
    public synchronized void turnGreenLight() {
        notifyAll();
    }


}
