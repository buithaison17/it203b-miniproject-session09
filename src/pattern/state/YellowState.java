package pattern.state;

public class YellowState implements TrafficLightState {

    @Override
    public void handle(TrafficLight light) {
        System.out.println("Đèn vàng - Chuẩn bị dừng lại");
        light.setState(new RedState());
    }

    @Override
    public String getStateName() {
        return "YELLOW";
    }
}
