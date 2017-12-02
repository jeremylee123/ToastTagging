package v1.system;

import com.palominolabs.http.url.UrlBuilder;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Http;

import javax.inject.Inject;
import java.nio.charset.CharacterCodingException;
import java.util.Optional;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

/**
 * Handles presentation of Post resources, which map to JSON.
 */
public class SystemResourceHandler {

    private final SystemRepository repository;
    private final HttpExecutionContext ec;

    @Inject
    public SystemResourceHandler(PostRepository repository, HttpExecutionContext ec) {
        this.repository = repository;
        this.ec = ec;
    }

    public CompletionStage<Stream<SystemResource>> getSystems(int page) {
        return repository.getSystems(page).thenApplyAsync(systemDataStream -> {
            return systemDataStream.map(data -> new SystemResource(data));
        }, ec.current());
    }
}
