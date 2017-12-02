package v1.system;

import net.jodah.failsafe.CircuitBreaker;
import net.jodah.failsafe.Failsafe;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.sql.SQLException;
import java.util.Optional;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;

import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * A repository that provides a non-blocking API with a custom execution context
 * and circuit breaker.
 */
@Singleton
public class JPASystemRepository implements SystemRepository {

    private final JPAApi jpaApi;
    private final SystemExecutionContext ec;
    private final CircuitBreaker circuitBreaker = new CircuitBreaker().withFailureThreshold(1).withSuccessThreshold(3);

    @Inject
    public JPASystemRepository(JPAApi api, SystemExecutionContext ec) {
        this.jpaApi = api;
        this.ec = ec;
    }

    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    @Override
    public CompletionStage<Stream<SystemData>> getSystems(String page) {
        return supplyAsync(() -> wrap(em -> select(em)), ec);
    }

    private Stream<SystemData> select(EntityManager em) {
        TypedQuery<SystemData> query = em.createQuery("SELECT s FROM SystemData s", SystemData.class);
        return query.getResultList().stream();
    }
}
