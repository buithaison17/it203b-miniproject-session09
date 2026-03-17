package pattern.state;

public class YellowState implements TrafficLightState {

    @Override
    public void handle(TrafficLight light) {

        System.out.println(" Đèn VÀNG - Chuẩn bị dừng");

        light.notifyObservers("YELLOW");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        light.setState(new RedState());
    }

    @Override
    public String getStateName() {
        return "YELLOW";
    }
}