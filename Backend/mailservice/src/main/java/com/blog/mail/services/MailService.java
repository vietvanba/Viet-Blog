package com.blog.mail.services;

import com.blog.mail.entities.Mail;
import com.blog.mail.entities.TimeUtils;
import com.blog.mail.exceptions.CannotSave;
import com.blog.mail.exceptions.NotFound;
import com.blog.mail.exceptions.NotMatch;
import com.blog.mail.repositories.MailRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MailService {
    private final MailRepository repository;
    private final JavaMailSender emailSender;
    private static final Logger LOGGER = LoggerFactory.getLogger(MailService.class);

    public Mail saveEmail(Mail mail) {
        try {
            return repository.save(mail);
        } catch (Exception e) {
            LOGGER.error("Can't save the mail. Below are all errors: \n" + e.getMessage());
            throw new CannotSave("Can't save the mail. Below are all errors: \n" + e.getMessage());
        } finally {
            try {
                automaticReplyEmail(mail.getAddress(), mail.getSender());
                LOGGER.info("Mail has been sent. "+mail.getAddress());
            } catch (Exception e) {
                LOGGER.error("Can't send the mail. Error: \n" + e.getMessage());
                throw new CannotSave(e.getMessage());
            }
        }
    }

    public Page<Mail> getAllMail(int pageNo, int pageSize) {
        System.out.println(pageNo);
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        return repository.findAll(pageable);
    }

    public Mail updateStatus(Integer id, Mail mail) {
        Mail mail_raw = repository.findById(id).orElseThrow(() -> {
            LOGGER.error("Not found the mail with ID is " + id);
            return new NotFound("Not found the mail with ID is " + id);
        });
        if (!Objects.equals(mail_raw.getAddress(), mail.getAddress())) {
            LOGGER.error("The specified mail does not match with the mail whose ID is " + id);
            throw new NotMatch("The specified mail does not match with the mail whose ID is " + id);
        } else {
            try {
                mail_raw.setStatus(mail.getStatus());
                LOGGER.info("Status updated. Id" + id);
                return repository.save(mail_raw);
            } catch (Exception e) {
                LOGGER.error("Status updated failed. Id" + id + " Error: " + e.getMessage());
                throw new CannotSave(e.getMessage());
            }

        }

    }

    public void automaticReplyEmail(String receiverAddress, String receiverName) {
        String subject = "[Viet's portfolio <vanbaviet.com>] <Automatic notification> Your message has been sent";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Van Ba Viet <admin@vanbaviet.com>");
        message.setTo(receiverAddress);
        message.setSubject(subject);
        message.setCc("baviet19@gmail.com");
        message.setText(TimeUtils.dailySession() + ", " + receiverName +
                "\nThank you for visiting my portfolio and deciding to contact me." +
                "\nThis is an automatic email notification that your email has been sent to me." +
                "\nI will reply you within a few days." +
                "\nIf you have any concern. Please feel free to contact me via email." +
                "\nHave a nice day and take care." +
                "\nBest regards," +
                "\nViet" +
                "\nVan Ba Viet");
        emailSender.send(message);
    }
}
