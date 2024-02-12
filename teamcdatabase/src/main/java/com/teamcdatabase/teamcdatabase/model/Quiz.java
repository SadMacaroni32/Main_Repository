package com.teamcdatabase.teamcdatabase.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Quiz {

    @Id
    @GeneratedValue
    private Long quizId;
    private short quizScore;
    private String quizTitle;
    private String userName;


    public Long getQuizId() {
        return this.quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public short getQuizScore() {
        return this.quizScore;
    }

    public void setQuizScore(short QuizScore) {
        this.quizScore = QuizScore;
    }

    public String getQuizTitle() {
        return this.quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
