package v1.system;

/**
 * Resource for the API.  This is a presentation class for frontend work.
 */
public class SystemResource {
    private String id;
    private String companyName;

    public PostResource() {
    }

    public PostResource(SystemData data) {
        this.id = data.id.toString();
        this.companyName = data.companyName;
    }
    public String getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

}
