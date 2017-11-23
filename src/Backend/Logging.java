package Backend;

import java.lang.System;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Logging {
    public Map<Date, String> logs;

    public Logging() {
        logs = new HashMap<Date, String>();
    }

    public void addLog(String logMessage) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date today = new Date();
        logs.put(today,logMessage);
    }

    public String readLog() {

        String log = "";

        for(Map.Entry<Date, String> entry : logs.entrySet()) {
            Date key = entry.getKey();
            String logString = entry.getValue();
            log += key + ": " + logString + "\n";
        }
        return log;
    }

    public static void main(String[] args) {
        Logging logManager = new Logging();
        logManager.addLog("This is a test log, User Omar created Tag ID 1");
        String results = logManager.readLog();
        System.out.println(results);
    }
}
