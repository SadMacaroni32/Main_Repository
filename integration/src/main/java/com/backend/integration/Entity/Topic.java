package com.backend.integration.Entity; // Package declaration

import com.fasterxml.jackson.annotation.JsonIgnore; // Import for JSON ignore annotation

import jakarta.persistence.CascadeType; // Importing CascadeType from jakarta.persistence package
import jakarta.persistence.Entity; // Importing Entity annotation from jakarta.persistence package
import jakarta.persistence.FetchType; // Importing FetchType from jakarta.persistence package
import jakarta.persistence.GeneratedValue; // Importing GeneratedValue from jakarta.persistence package
import jakarta.persistence.Id; // Importing Id annotation from jakarta.persistence package
import jakarta.persistence.JoinColumn; // Importing JoinColumn from jakarta.persistence package
import jakarta.persistence.ManyToOne; // Importing ManyToOne from jakarta.persistence package

@Entity // Marks the class as an entity
public class Topic {

    @Id // Marks the field as primary key
    @GeneratedValue // Generates the value for the primary key
    private Long topic_id; // Unique identifier for the topic
    private String topic_title; // Title of the topic
    private String topic_description; // Description of the topic
    private byte[] topic_file; // File associated with the topic
    private String topic_link; // Link associated with the topic

    // JPA relationship many-to-one between Chapter and Topic
    @JsonIgnore // Ignores serialization and deserialization of this property
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Defines the many-to-one relationship with lazy loading
    @JoinColumn(name ="chapter_id") // Specifies the foreign key column in the Topic table
    private Chapter chapter; // Associated chapter for the topic

    public Chapter getChapter() { // Getter for associated chapter
        return this.chapter;
    }

    public void setChapter(Chapter chapter) { // Setter for associated chapter
        this.chapter = chapter;
    }

    // Getter and setter methods for other properties
    public Long getTopic_id() {
        return this.topic_id;
    }

    public void setTopic_id(Long topic_id) {
        this.topic_id = topic_id;
    }

    public String getTopic_title() {
        return this.topic_title;
    }

    public void setTopic_title(String topic_title) {
        this.topic_title = topic_title;
    }

    public String getTopic_description() {
        return this.topic_description;
    }

    public void setTopic_description(String topic_description) {
        this.topic_description = topic_description;
    }

    public byte[] getTopic_file() {
        return this.topic_file;
    }

    public void setTopic_file(byte[] topic_file) {
        this.topic_file = topic_file;
    }

    public String getTopic_link() {
        return this.topic_link;
    }

    public void setTopic_link(String topic_link) {
        this.topic_link = topic_link;
    }
}
