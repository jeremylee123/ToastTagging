package Backend;
import java.lang.*;

public class Tag {
    private String ID;
    private String text;
    private String userID;
    private int visibility;

    Tag(String input_ID, String input_text, String input_UserID, int input_visibility){
        setID(input_ID);
        setText(input_text);
        setUserID(input_UserID);
        setVisibility(input_visibility);
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
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
