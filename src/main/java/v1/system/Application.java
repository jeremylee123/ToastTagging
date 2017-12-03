package v1.system;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.*;

import javax.inject.Inject;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

public class Application extends Controller {

  @Inject
  private SystemDAO dao;

      public CompletionStage<Result> getSystem(String page) {
      return dao.getSystem(page).thenApplyAsync(system -> {
        return ok(Json.toJson(system));
      });
    }
}
