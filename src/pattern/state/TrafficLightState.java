package pattern.state;

public interface TrafficLightState {

    void handle(TrafficLight light);

    String getStateName();
}