package Backend;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.lang.System;

public class Logging {
    HashMap<String, String> log = new HashMap<>();

    public void addLog(String logInput) {
        //if 2 users send a log to the system at the same time (ms wise) only one will be added to log.
        //TODO: fix above issue

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String currentDate = new Date().toString();
        log.put(currentDate, logInput);
    }

    public String getLog() {
       String logOutput = "";
        Iterator it = log.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            logOutput += pair.getKey().toString() + ": " +  pair.getValue();
        }
        return  logOutput;
    }

    public static void main(String[] args) {
        Logging testLog = new Logging();
        testLog.addLog("This is a test log.");
        String log = testLog.getLog();
        System.out.println(log);
    }
}
