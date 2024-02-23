// January 13, 2024
package com.teamcid.teamcapplication.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType; // Importing CascadeType from jakarta.persistence package
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long course_id; // Unique identifier for the course

    private String course_title; // Title of the course
    private String course_description; // Description of the course
    private Date course_start_date; // Start date of the course
    private Date course_end_date; // End date of the course


    
    //february 13 2024
    // January 24, 2024: JPA relationship successfully integrated many-to-many

    // January 30, 2024

    // February 6, 2024

    // February 8, 2024: Bug fixed - can add chapter inside course

    // Mapping many-to-one relationship from Chapter
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<chapter> chapter; // List of chapters associated with the course

    public List<chapter> getChapter() {
        return this.chapter;
    }

    public void setChapter(List<chapter> chapter) {
        this.chapter = chapter;
    }

    // Used in adding chapter inside course
    @JsonIgnore
    public void addChapter(chapter chapter) {
        chapter.setCourse(this); // Set the course for the chapter
        this.getChapter().add(chapter); // Add the chapter to the collection of chapters
    }

    // February 8, 2024: Bug fixed - can add chapter inside course

    // February 6, 2024

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

}
// January 13, 2024
