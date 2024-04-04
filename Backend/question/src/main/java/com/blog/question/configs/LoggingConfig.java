package com.blog.question.configs;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.rolling.RollingFileAppender;
import ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy;
import ch.qos.logback.core.rolling.TimeBasedRollingPolicy;
import ch.qos.logback.core.util.FileSize;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
public class LoggingConfig {
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd");
    private SimpleDateFormat timeFormat = new SimpleDateFormat("HH_mm_ss");
    public LoggingConfig(@Value("${log_path.folder}") String folder_path,
                         @Value("${log_path.file}") String file_path) {

        String date = dateFormat.format(new Date());
        String time = timeFormat.format(new Date());
        String filename = folder_path + date + file_path + time + ".log";
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        RollingFileAppender<ILoggingEvent> fileAppender = new RollingFileAppender<>();
        fileAppender.setContext(loggerContext);
        fileAppender.setFile(filename);
        PatternLayoutEncoder encoder = new PatternLayoutEncoder();
        encoder.setContext(loggerContext);
        encoder.setPattern("%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n");
        encoder.start();
        fileAppender.setEncoder(encoder);

        TimeBasedRollingPolicy<ILoggingEvent> rollingPolicy = new TimeBasedRollingPolicy<>();
        rollingPolicy.setFileNamePattern(folder_path + date + "/%d{yyyy_MM_dd'T'HH_mm_ss}.log");
        rollingPolicy.setMaxHistory(10);
        rollingPolicy.setParent(fileAppender);
        rollingPolicy.setContext(loggerContext);
        rollingPolicy.start();

        SizeBasedTriggeringPolicy<ILoggingEvent> triggeringPolicy = new SizeBasedTriggeringPolicy<>();
        triggeringPolicy.setMaxFileSize(FileSize.valueOf("10MB"));
        triggeringPolicy.setContext(loggerContext);
        triggeringPolicy.start();

        fileAppender.setRollingPolicy(rollingPolicy);
        fileAppender.setTriggeringPolicy(triggeringPolicy);
        fileAppender.start();

        Logger rootLogger = (Logger) LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.addAppender(fileAppender);
    }
}
