package com.blog.authservice.entities;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeUtils {
    public static String convertTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        return formatter.format(new Date());
    }

    public static String dailySession() {
        Calendar cal = Calendar.getInstance();
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        if (hour >= 11 && hour <= 17) {
            return "Good afternoon";
        } else {
            if (hour >= 18) {
                return "Good evening";
            } else return "Good morning";
        }
    }
}
