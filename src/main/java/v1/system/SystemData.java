package v1.system;

import javax.persistence.*;

/**
 * Data returned from the database
 */
@Entity
public class SystemData {
  @Id
  @Column(name = "id")
  public String id;
  @Column(name = "companyName")
  public String companyName;

    public SystemData() {
    }

    public SystemData(String companyName) {
        this.companyName = companyName;
    }
}
