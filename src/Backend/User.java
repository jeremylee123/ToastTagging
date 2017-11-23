package Backend;
import java.lang.*;
import java.util.HashMap;
import java.util.Map;

public class User {
    private String userID;
    private boolean isAdmin;
    private String name;
    private Map<String, Object> privateTags;

    public static GlobalVariables globalVars = new GlobalVariables(); //all User objects will share globalVars
    public static Logging log = new Logging(); //all User objects will share globalVars


    User(String input_name){
        name = input_name;
        privateTags = new HashMap<String, Object>();
    }

    private void createTag(String tagName, int tagVisibility) {
        if (tagVisibility == 0) { //public tag
            Tag createdTag = new Tag(tagName, userID, tagVisibility); //create the Tag object
            globalVars.addGlobalTag(createdTag.getID(), createdTag); //add the public Tag object to the Global Variables
            log.addLog(createdTag.getID());//LOG
            System.out.println("Tag Created and added to ");
        } else if (tagVisibility == 1) { //group tag
            Tag createdTag = new Tag(tagName, userID, tagVisibility); //create the Tag object
            //TODO: Implement adding tag to a system group
        } else if (tagVisibility == 2) { //private tag
            Tag createdTag = new Tag(tagName, userID, tagVisibility); //create the Tag object
            privateTags.put(createdTag.getID(), createdTag); //add the private Tag object to the private_Tags hash map
        } else {
            System.out.println("You broke me somehow...");
        }

    }
    private void deleteTag(int tagID) {
        if(privateTags.containsKey(tagID)) {
            privateTags.remove(tagID);
            System.out.println("Tag removed from private tags...");
        } else if(globalVars.containsTag(tagID)) {
            globalVars.tags.remove(tagID);
            System.out.println("Tag removed from public tags...");
        } else if (true) {
            //TODO: implement removing tag from system groups
        }

    }
    private void renameTag(String tagName) {


    }
    private void changeVisibility(String tagName, String visibility) {

    }
    private void tagSystem(String tagID, String systemID) {

    }
    private void createGroup(String groupName) {

    }
    private void addUserToGroup(String groupID, String userID) {

    }
    private void addSystemsToGroup(String groupID, String systemID) {

    }
    private void renameGroup(String groupName, String newGroupName) {

    }
    private void deleteGroup(String groupName) {

    }

    //MAIN METHOD
    public static void main(String[] args) {

    }
}
