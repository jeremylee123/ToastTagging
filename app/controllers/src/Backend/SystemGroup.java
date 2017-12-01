package Backend;

import java.security.SecureRandom;
import java.util.ArrayList;

public class SystemGroup {
    public String name;
    public User manager;
    public String groupID;
    private ArrayList<Systems> systems;
    private Tag[] groupTags;

    //random ID generation
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static SecureRandom rnd = new SecureRandom();

    public SystemGroup(String groupName) {
        name = groupName;
        manager = null;
        groupID = generateGroupID();
        systems = new ArrayList<Systems>();
    }


    public String generateGroupID() {
        int len = 15;
        StringBuilder sb = new StringBuilder( len );
        for( int i = 0; i < len; i++ )
            sb.append( AB.charAt( rnd.nextInt(AB.length()) ) );
        return sb.toString();
    }

    public void setCreator(User creator) {
        manager = creator;
    }

    public String getID() {
        return groupID;
    }

    public static void main(String[] args) {
        SystemGroup testingGroup = new SystemGroup("Toast Tagging");
        String groupID = testingGroup.getID();
        System.out.println("Generated Group ID: " + groupID);
    }
}
