package pattern.state;

public class TrafficLight {

    private TrafficLightState currentState;

    public TrafficLight() {
        currentState = new RedState(); // bắt đầu từ đèn đỏ
    }

    public void setState(TrafficLightState state) {
        this.currentState = state;
    }

    public void change() {
        currentState.handle(this);
    }

    public String getCurrentState() {
        return currentState.getStateName();
    }
}