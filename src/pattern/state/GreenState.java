package pattern.state;

public class GreenState implements TrafficLightState {

    @Override
    public void handle(TrafficLight light) {

        System.out.println(" Đèn XANH - Xe được phép đi");

        light.notifyObservers("GREEN");

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        light.setState(new YellowState());
    }

    @Override
    public String getStateName() {
        return "GREEN";
    }
}