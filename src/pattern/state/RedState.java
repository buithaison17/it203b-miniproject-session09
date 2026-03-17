package pattern.state;

public class RedState implements TrafficLightState {

    @Override
    public void handle(TrafficLight light) {

        System.out.println(" Đèn ĐỎ - Xe phải dừng");

        light.notifyObservers("RED");

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        light.setState(new GreenState());
    }

    @Override
    public String getStateName() {
        return "RED";
    }
}
