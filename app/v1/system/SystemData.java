package v1.system;

import javax.persistence.*;

/**
 * Data returned from the database
 */
@Entity
@Table(name = "system")
public class SystemData {

  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  public Long id;
  public String companyName;

    public SystemData() {
    }

    public SystemData(String companyName) {
        this.companyName = companyName;
    }
}
