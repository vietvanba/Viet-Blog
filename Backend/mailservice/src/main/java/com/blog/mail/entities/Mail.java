package com.blog.mail.entities;

import com.blog.mail.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "Sender is required")
    private String sender;
    @NotBlank(message = "Email is required")
    @Email(message = "Please correct your email.")
    private String address;
    @NotBlank(message = "Content is required")
    private String content;
    @NotBlank
    private String time = TimeUtils.convertTime();
    private Status status = Status.NEW;

}
