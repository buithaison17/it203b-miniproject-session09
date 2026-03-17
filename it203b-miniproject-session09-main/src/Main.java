import pattern.observer.VehicleObserver;
import pattern.observer.TrafficLightObserver;
import pattern.state.TrafficLight;
import engine.SimulationEngine;

public class Main {

    public static void main(String[] args) {

        TrafficLight trafficLight = new TrafficLight();

        SimulationEngine simulationEngine = new SimulationEngine();
        simulationEngine.start();

        // Xe tham gia giao thông
        VehicleObserver car1 = new VehicleObserver("Car 1");
        VehicleObserver car2 = new VehicleObserver("Car 2");

        // Monitor trạng thái đèn giao thông
        TrafficLightObserver monitor = new TrafficLightObserver();

        // Đăng ký observer
        trafficLight.attach(car1);
        trafficLight.attach(car2);
        trafficLight.attach(monitor);

        // Thread cho đèn giao thông
        Thread trafficThread = new Thread(trafficLight);

        trafficThread.setDaemon(true);

        trafficThread.start();
    }
}