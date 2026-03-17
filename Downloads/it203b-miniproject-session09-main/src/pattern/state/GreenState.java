package pattern.state;

public class GreenState implements TrafficLightState {

    @Override
    public void handle(TrafficLight light) {
        System.out.println("Đèn xanh - Xe được phép đi");
        light.setState(new YellowState());
    }

    @Override
    public String getStateName() {
        return "GREEN";
    }
}