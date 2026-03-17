package pattern.observer;

import pattern.state.TrafficLight;

public class TrafficLightObserver implements Observer {

    @Override
    public void update(String message) {

        switch (message) {

            case "RED":
                System.out.println("  Đèn giao thông chuyển sang ĐỎ");
                break;

            case "GREEN":
                System.out.println(" Đèn giao thông chuyển sang XANH");
                break;

            case "YELLOW":
                System.out.println("  Đèn giao thông chuyển sang VÀNG");
                break;

            default:
                System.out.println("  Trạng thái đèn: " + message);
        }
    }

    @Override
    public void update(TrafficLight light) {

    }
}