inThisBuild(
  List(
    scalaVersion := "2.12.3",
    dependencyOverrides := Seq(
       "org.codehaus.plexus" % "plexus-utils" % "3.0.18",
       "com.google.code.findbugs" % "jsr305" % "3.0.1",
       "com.google.guava" % "guava" % "22.0",
       "com.typesafe.akka" %% "akka-stream" % "2.5.6",
       "com.typesafe.akka" %% "akka-actor" % "2.5.6"
    )
  )
)

javaSource in Compile := baseDirectory.value / "src"


lazy val GatlingTest = config("gatling") extend Test

lazy val root = (project in file(".")).enablePlugins(PlayJava, GatlingPlugin).configs(GatlingTest)
  .settings(inConfig(GatlingTest)(Defaults.testSettings): _*)
  .settings(
    scalaSource in GatlingTest := baseDirectory.value / "/gatling/simulation"
  )
  libraryDependencies ++= Seq(
    javaJpa,
    "mysql" % "mysql-connector-java" % "6.0.2",
    "org.hibernate" % "hibernate-core" % "5.2.12.Final",
    "org.hibernate" % "hibernate-entitymanager" % "5.2.12.Final"
  )

libraryDependencies += guice
libraryDependencies += "io.dropwizard.metrics" % "metrics-core" % "3.2.1"
libraryDependencies += "com.palominolabs.http" % "url-builder" % "1.1.0"
libraryDependencies += "net.jodah" % "failsafe" % "1.0.3"

libraryDependencies += "io.gatling.highcharts" % "gatling-charts-highcharts" % "2.3.0" % Test
libraryDependencies += "io.gatling" % "gatling-test-framework" % "2.3.0" % Test

PlayKeys.externalizeResources := false

testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))

routesGenerator := InjectedRoutesGenerator
fork in run := true
