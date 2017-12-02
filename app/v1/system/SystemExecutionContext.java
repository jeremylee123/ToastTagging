package v1.system;

import akka.actor.ActorSystem;
import play.libs.concurrent.CustomExecutionContext;

import javax.inject.Inject;

/**
 * Custom execution context wired to "post.repository" thread pool
 */
public class SystemExecutionContext extends CustomExecutionContext {

    @Inject
    public SystemExecutionContext(ActorSystem actorSystem) {
        super(actorSystem, "system.repository");
    }
}
