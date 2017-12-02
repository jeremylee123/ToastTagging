package v1.system;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.*;

import javax.inject.Inject;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

@With(SystemAction.class)
public class SystemController extends Controller {

    private HttpExecutionContext ec;
    private SystemResourceHandler handler;

    @Inject
    public SystemController(HttpExecutionContext ec, SystemResourceHandler handler) {
        this.ec = ec;
        this.handler = handler;
    }

    public CompletionStage<Result> getSystems(String page) {
      return handler.getSystems(page).thenApplyAsync(systems -> {
          final List<SystemResource> systemsList = systems.collect(Collectors.toList());
          System.out.println("We have " + systemsList.size() + " entries.");
          return ok(Json.toJson(systemsList));
      }, ec.current());
    }
}
