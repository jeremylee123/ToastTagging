package v1.system;

import javax.persistence.*;

/**
 * Data returned from the database
 */
@Entity(name = "system")
public class SystemData {

  @Id
  @Column(name="id")
  public String id;
  @Column(name="companyName")
  public String companyName;

    public SystemData() {
    }
    
    public String getId() {
    	return id;
    }
    
    public String getCompanyName() {
    	return companyName;
    }
    
    public void setId(String id) {
    	this.id = id;
    }
    
    public void setCompanyName(String companyName) {
    	this.companyName = companyName;
    }

    public SystemData(String companyName) {
        this.companyName = companyName;
    }
}
