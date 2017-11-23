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

    public static void main(String[] args) throws InterruptedException {
        //Its very unlikely, but if 2 or more items are added to the log at the same time,
        // only one will be added since the date key value will be the same

        Logging logManager = new Logging();
        logManager.addLog("This is a test log, User Omar created Tag ID 1");
        Thread.sleep(100);
        logManager.addLog("This is a test log, User Omar created Tag ID 2");
        Thread.sleep(100);
        logManager.addLog("This is a test log, User Omar created Tag ID 3");
        Thread.sleep(100);
        logManager.addLog("This is a test log, User Omar created Tag ID 4");
        String results = logManager.readLog();
        System.out.println(results);
    }
}
