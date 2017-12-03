package v1.system;

import play.db.jpa.*;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.List;
import java.util.concurrent.*;
import javax.persistence.Persistence;
import javax.inject.*;
import javax.persistence.*;
import java.util.concurrent.*;




@Singleton
public class SystemDAO {
 private JPAApi jpaApi;
    @Inject
    public SystemDAO(JPAApi jpaApi) {
      this.jpaApi = jpaApi;
    }
    public CompletableFuture<SystemData> getSystem(String id) {
        return CompletableFuture.supplyAsync(() -> {

          EntityManager em = jpaApi.em();
          //EntityManager em = Persistence.createEntityManagerFactory("defaultPersistenceUnit").createEntityManager();
          Query q = em.createQuery("select f from system f where f.id=?1", SystemData.class);
          q.setParameter(1, id);

          SystemData result = null;
          try {
              result = (SystemData) q.getSingleResult();
          } catch (NoResultException ex) {
              System.out.println("fuck");
          }
          em.close();
          return result;
        });
    }

}
