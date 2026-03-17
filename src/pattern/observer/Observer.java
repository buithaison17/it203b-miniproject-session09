package pattern.observer;

import pattern.state.TrafficLight;

public interface Observer {

    void update(String message);
}
