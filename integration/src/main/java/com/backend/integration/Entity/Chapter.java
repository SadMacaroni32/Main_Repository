package com.backend.integration.Entity; // Package declaration

import java.util.List; // Import for using List data structure

import com.fasterxml.jackson.annotation.JsonIgnore; // Import for JSON ignore annotation

import jakarta.persistence.CascadeType; // Importing CascadeType from jakarta.persistence package
import jakarta.persistence.Entity; // Importing Entity annotation from jakarta.persistence package
import jakarta.persistence.FetchType; // Importing FetchType from jakarta.persistence package
import jakarta.persistence.GeneratedValue; // Importing GeneratedValue from jakarta.persistence package
import jakarta.persistence.GenerationType; // Importing GenerationType from jakarta.persistence package
import jakarta.persistence.Id; // Importing Id annotation from jakarta.persistence package
import jakarta.persistence.JoinColumn; // Importing JoinColumn from jakarta.persistence package
import jakarta.persistence.ManyToOne; // Importing ManyToOne annotation from jakarta.persistence package
import jakarta.persistence.OneToMany; // Importing OneToMany annotation from jakarta.persistence package

@Entity // Marks the class as an entity
public class Chapter {

    @Id // Marks the field as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies the generation strategy for the primary key
    private Long chapter_id; // Unique identifier for the chapter

    private String chapter_title; // Title of the chapter
    private String chapter_date_created; // Date when the chapter was created

    // MANY TO ONE RELATIONSHIP BETWEEN COURSE AND CHAPTER
    @JsonIgnore // Ignores serialization and deserialization of this property
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Defines a many-to-one relationship
    @JoinColumn(name = "course_id") // Defines the foreign key column in the Chapter table
    private Course course; // Associated course for the chapter

    public Course getCourse() { // Getter method for course
        return this.course;
    }
    
    public void setCourse(Course course) { // Setter method for course
        this.course = course;
    }

    // JPA relationship one to many between chapter and topic
    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Defines a one-to-many relationship
    private List<Topic> topic; // List of topics associated with the chapter

    public List<Topic> getTopic() { // Getter method for topics
        return this.topic;
    }
    
    public void setTopic(List<Topic> topic) { // Setter method for topics
        this.topic = topic;
    }

    // Method to add a topic to the chapter
    @JsonIgnore // Ignores serialization and deserialization of this method
    public void addTopic(Topic topic) {
        topic.setChapter(this); // Sets the chapter for the topic
        this.getTopic().add(topic); // Adds the topic to the collection of topics
    }

    // Getter and setter methods for chapter properties
    public Long getChapter_id() {
        return this.chapter_id;
    }
    
    public void setChapter_id(Long chapter_id) {
        this.chapter_id = chapter_id;
    }
    
    public String getChapter_title() {
        return this.chapter_title;
    }
    
    public void setChapter_title(String chapter_title) {
        this.chapter_title = chapter_title;
    }
    
    public String getChapter_date_created() {
        return this.chapter_date_created;
    }
    
    public void setChapter_date_created(String chapter_date_created) {
        this.chapter_date_created = chapter_date_created;
    }
}  
