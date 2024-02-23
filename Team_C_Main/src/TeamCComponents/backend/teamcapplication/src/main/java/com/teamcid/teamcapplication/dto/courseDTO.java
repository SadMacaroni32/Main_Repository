//January 22 2024 data transfer object

package com.teamcid.teamcapplication.dto;

import java.sql.Date;

public class courseDTO {    
    private Long course_id;
    private String course_title;
    private String course_description; 
    private Date course_start_date;
    private Date course_end_date;
    private String chapter_title;
    private Long instructor_id;

    public Long getCourse_id() {
        return this.course_id;
    }

    public void setCourse_id(Long course_id) {
        this.course_id = course_id;
    }

    public String getCourse_title() {
        return this.course_title;
    }

    public void setCourse_title(String course_title) {
        this.course_title = course_title;
    }

    public String getCourse_description() {
        return this.course_description;
    }

    public void setCourse_description(String course_description) {
        this.course_description = course_description;
    }

    public Date getCourse_start_date() {
        return this.course_start_date;
    }

    public void setCourse_start_date(Date course_start_date) {
        this.course_start_date = course_start_date;
    }

    public Date getCourse_end_date() {
        return this.course_end_date;
    }

    public void setCourse_end_date(Date course_end_date) {
        this.course_end_date = course_end_date;
    }

    public String getChapter_title() {
        return this.chapter_title;
    }

    public void setChapter_title(String chapter_title) {
        this.chapter_title = chapter_title;
    }

    public Long getInstructor_id() {
        return this.instructor_id;
    }

    public void setInstructor_id(Long instructor_id) {
        this.instructor_id = instructor_id;
    }

}   
//January 22 2024 data transfer object
