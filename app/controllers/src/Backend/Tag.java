package Backend;
import java.lang.*;
import java.security.SecureRandom;

public class Tag {
    private String tagID;
    private String tagName;
    private String userID;
    private int visibility;

    //random ID generation
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static SecureRandom rnd = new SecureRandom();

    Tag(String input_text, String input_UserID, int input_visibility){
        tagID = generateTagID();
        tagName = input_text;
        userID = input_UserID;
        visibility = input_visibility;
    }

    public String generateTagID() {
        int len = 15;
        StringBuilder sb = new StringBuilder( len );
        for( int i = 0; i < len; i++ )
            sb.append( AB.charAt( rnd.nextInt(AB.length()) ) );
        return sb.toString();
    }


    public String getText() {
        return tagName;
    }

    public void setText(String text) {
        this.tagName = text;
    }

    public String getID() {
        return tagID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public int getVisibility() {
        return visibility;
    }

    public void setVisibility(int visibility) {
        this.visibility = visibility;
    }

    public static void main(String [] args) {
        Tag testingTag = new Tag("Test Tag", "1", 0);
        String tagID = testingTag.getID();
        System.out.println("Generated Tag ID: " + tagID);
    }
}
