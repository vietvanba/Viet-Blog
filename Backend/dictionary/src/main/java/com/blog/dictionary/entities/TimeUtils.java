package com.blog.dictionary.entities;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {
    public static String convertTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        return formatter.format(new Date());
    }
}
