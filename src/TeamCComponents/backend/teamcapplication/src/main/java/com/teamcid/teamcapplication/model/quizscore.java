package com.teamcid.teamcapplication.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="quizscores")
public class quizscore {

    @Id
    @GeneratedValue

    @Column(name = "quizId")     
    private Long qId;

    @Column(name = "quizScore")
    private Long qScore;

    public Long getQId() {
        return this.qId;
    }

    public void setQId(Long qId) {
        this.qId = qId;
    }

    public Long getQScore() {
        return this.qScore;
    }

    public void setQScore(Long qScore) {
        this.qScore = qScore;
    }


}
