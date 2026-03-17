package pattern.observer;

public class VehicleObserver implements Observer {

    private String vehicleName;

    public VehicleObserver(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    @Override
    public void update(String message) {

        if (message.equals("RED")) {
            System.out.println(vehicleName + " dừng lại.");
        }

        if (message.equals("GREEN")) {
            System.out.println(vehicleName + " bắt đầu di chuyển.");
        }

        if (message.equals("YELLOW")) {
            System.out.println(vehicleName + " giảm tốc.");
        }
    }
}