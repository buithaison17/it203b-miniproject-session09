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
        if (level == LogLevel.INFO) {
            infoCount++;
        } else if (level == LogLevel.ERROR) {
            errorCount++;
        }
        System.out.println("[" + time + "] [" + level + "] [" + thread + "] " + message);
    }
    public synchronized void printStats() {
        System.out.println("\n===== LOG STATS =====");
        System.out.println("INFO  : " + infoCount);
        System.out.println("ERROR : " + errorCount);
        System.out.println("TOTAL : " + (infoCount + errorCount));
    }
}