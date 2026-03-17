package pattern.state;

import pattern.observer.Observer;
import pattern.observer.Subject;

import java.util.ArrayList;
import java.util.List;

public class TrafficLight implements Subject, Runnable {

    private TrafficLightState state;
    private List<Observer> observers = new ArrayList<>();

    public TrafficLight() {
        state = new RedState();
    }

    public void setState(TrafficLightState state) {
        this.state = state;
    }

    public String getState() {
        return state.getStateName();
    }

    public void change() {
        state.handle(this);
    }

    @Override
    public void run() {

        while (true) {

            System.out.println("Trạng thái hiện tại: " + getState());

            change();
        }
    }

    @Override
    public void attach(Observer o) {
        observers.add(o);
    }

    @Override
    public void detach(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers(String message) {
        for (Observer o : observers) {
            o.update(message);
        }
    }
}