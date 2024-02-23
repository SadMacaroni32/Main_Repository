package com.teamcid.teamcapplication.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chapter_id; // Unique identifier for the chapter

    private String chapter_title; // Title of the chapter
    private String chapter_date_created; // Date when the chapter was created

    // January 30, 2024

    // February 8, 2024: Bug fixed - can add chapter inside course

    // MANY TO ONE RELATIONSHIP BETWEEN COURSE AND CHAPTER
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id") // Defines the foreign key column in the Chapter table
    private course course; // Associated course for the chapter

    public course getCourse() {
        return this.course; // Getter for course
    }
    
    public void setCourse(course course) {
        this.course = course; // Setter for course
    }

    // February 8, 2024: Bug fixed - can add chapter inside course

    // February 12, 2024

    // JPA relationship one to many between chapter and topic

    // February 12, 2024

    // February 13, 2024
    // Used in adding topic inside chapter

    // February 13, 2024

    public Long getChapter_id() {
        return this.chapter_id; // Getter for chapter_id
    }
    
    public void setChapter_id(Long chapter_id) {
        this.chapter_id = chapter_id; // Setter for chapter_id
    }
    
    public String getChapter_title() {
        return this.chapter_title; // Getter for chapter_title
    }
    
    public void setChapter_title(String chapter_title) {
        this.chapter_title = chapter_title; // Setter for chapter_title
    }
    
    public String getChapter_date_created() {
        return this.chapter_date_created; // Getter for chapter_date_created
    }
    
    public void setChapter_date_created(String chapter_date_created) {
        this.chapter_date_created = chapter_date_created; // Setter for chapter_date_created
    }
    
    
   
    
}
