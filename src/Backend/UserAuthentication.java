package Backend;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.lang.System;

public class UserAuthentication {
    HashMap<String, String> users = new HashMap<>();

    public boolean userAuthentication(String username, String password) {
        boolean authenticated = false;
        //checks to see if username and password matches a user in the hashmap.
        if(users.containsKey(username.toLowerCase())) {
            if(users.get(username.toLowerCase()).equals(password)) {
                authenticated = true;
            }
        }
        return  authenticated;
    }

    public String addUser(String username, String password, boolean isAdmin) {
        String results = "";
        if (isAdmin) {
            if (users.containsKey(username)) {
                results += username.toLowerCase() + " Already exists, please choose a different username";
                return results;
            } else {
                users.put(username.toLowerCase(), password);
                results += username + " added to users";
                return results;
            }
        } else {
            results += "Cannot create user. User creator must be admin";
            return results;
        }
    }

    public String removeUser(String username, boolean isAdmin) {
        String results = "";
        if (isAdmin) {
            if (users.containsKey(username.toLowerCase())) {
                users.remove(username.toLowerCase());
                results += username.toLowerCase() + " has been removed from users";
                return results;
            } else {
                results += username.toLowerCase() + " is not a user in the system";
                return results;
            }
        } else {
            results += "Cannot remove user. Must be admin";
            return results;
        }
    }

    public String getUsers() {
        String logOutput = "Username : Password \n";
        Iterator it = users.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            logOutput += pair.getKey().toString() + " : " +  pair.getValue();
        }
        return  logOutput;
    }

    public static void main(String[] args) {
        UserAuthentication authentication = new UserAuthentication();
        //testing adding user non admin
        String results1 = authentication.addUser("Osanchez","testPassword", false);
        System.out.println(results1);
        //testing adding user admin
        String results2 = authentication.addUser("Osanchez","testPassword", true);
        System.out.println(results2);
    }
}
