package logger;

import logger.LogLevel;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Logger {

    private static Logger instance;

    private Logger() {}

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(LogLevel level, String message) {
        String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        String thread = Thread.currentThread().getName();

        System.out.println("[" + time + "] [" + level + "] [" + thread + "] " + message);
    }
}