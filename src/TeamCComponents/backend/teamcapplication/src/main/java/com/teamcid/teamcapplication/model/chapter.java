package com.teamcid.teamcapplication.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="chapter")
public class chapter {

    @Id
    @GeneratedValue

    @Column(name = "chapterid")     
    private int chapterId;

    @Column(name = "chapter_title")
    private String chapterTitle;

    @Column(name = "chapter_description")
    private String chapterDescription;

    public int getChapterId() {
        return this.chapterId;
    }

    public void setChapterId(int chapterId) {
        this.chapterId = chapterId;
    }

    public String getChapterTitle() {
        return this.chapterTitle;
    }

    public void setChapterTitle(String chapterTitle) {
        this.chapterTitle = chapterTitle;
    }

    public String getChapterDescription() {
        return this.chapterDescription;
    }

    public void setChapterDescription(String chapterDescription) {
        this.chapterDescription = chapterDescription;
    }

}
