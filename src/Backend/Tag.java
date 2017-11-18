package Backend;
import java.lang.*;

public class Tag {
    private static int tagCount = 0;

    private int tagID;
    private String tagName;
    private String userID;
    private int visibility;

    Tag(String input_text, String input_UserID, int input_visibility){
        tagID = tagCount++;
        tagName = input_text;
        userID = input_UserID;
        visibility = input_visibility;
    }


    public String getText() {
        return tagName;
    }

    public void setText(String text) {
        this.tagName = text;
    }

    public int getID() {
        return tagID;
    }

    public void setID(int ID) {
        this.tagID = ID;
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
}
