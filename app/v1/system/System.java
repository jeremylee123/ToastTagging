package v1.system;

import javax.persistence.*;

/**
 * Data returned from the database
 */
@Entity
@Table(name = "system")
public class System {

  @Id
  @Column(name="id")
  public String id;
  @Column(name="companyName")
  public String companyName;
//  @Column(name="systemName")
//  public String systemName;
//  @Column(name="serialNumber")
//  public int serialNumber;
//  @Column(name="productFamily")
//  public int productFamily;
//  @Column(name="model")
//  public String model;
//  @Column(name="osVersion")
//  public String osVersion;
//  @Column(name="patches")
//  public String patches;
//  @Column(name="cpgCount")
//  public int cpgCount;

    public System() {
    }
    
    public System(String id, String companyName) {
    	this.id = id;
    	this.companyName = companyName;
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

    public System(String companyName) {
        this.companyName = companyName;
    }
}
