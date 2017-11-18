package Backend;

import java.util.HashMap;
import java.util.Map;

public class GlobalVariables {

    public Map<Integer, Object> tags; //hash map that will store all global tag objects

    GlobalVariables() {
        tags = new HashMap<Integer, Object>();
    }

    public Map getGlobalTags() { //returns the hashmap that contains all tags
        return tags;
    }

    public void addGlobalTag(int tagID, Tag tag){ //store tags by their unique ID into the hashmap
        tags.put(tagID, tag);
    }

    public Object getGlobalTag(int tagID) { //return the tag object from the hashmap of objects
        Object retrievedTag = (Tag) tags.get(tagID); //retrieve the objcet by tagID and cast Tag object to it
        return retrievedTag;
    }

    public boolean containsTag(int tagID) {
        return tags.containsKey(tagID);
    }

    public void updateGlobalTag(int tagID) {
        //TODO: implement function that can edit tag objects and update them in the hashmap
    }
}
