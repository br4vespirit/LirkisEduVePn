FROM maven:3.8.3-openjdk-17

COPY pom.xml /app/pom.xml

COPY . /app

WORKDIR /app

RUN mvn package -f pom.xml -DskipTests

RUN cp target/LirkisEduVePn-service-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar", "app.jar"]