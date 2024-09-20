# OpenJDK 17을 기반으로 하는 경량화된 스프링 부트 이미지
FROM openjdk:17-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 빌드 후 생성된 JAR 파일을 컨테이너로 복사
COPY build/libs/app-1.0.0.jar app.jar

# 포트 설정
EXPOSE 8080

# 컨테이너가 시작될 때 실행할 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]
