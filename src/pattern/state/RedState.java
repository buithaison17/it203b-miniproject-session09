package pattern.state;

public class RedState implements TrafficLightState {

    @Override
    public void handle(TrafficLight light) {
        System.out.println("Đèn đỏ - Xe phải dừng lại");
        light.setState(new GreenState());
    }

    @Override
    public String getStateName() {
        return "RED";
    }

}
