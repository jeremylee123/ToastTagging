package v1.system;

import java.util.Optional;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public interface SystemRepository {

    CompletionStage<Stream<System>> getSystems(String page);

}
