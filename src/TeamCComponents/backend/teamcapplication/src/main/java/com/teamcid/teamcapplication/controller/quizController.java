package com.teamcid.teamcapplication.controller;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamcid.teamcapplication.model.quizscore;


import com.teamcid.teamcapplication.repository.quizRepository;


@RestController
@RequestMapping("/quizscores")
public class quizController {

    
    @Autowired
    private quizRepository quizScoreRepository;

    @PostMapping
    public ResponseEntity createQuizScore(@RequestBody quizscore Score) throws URISyntaxException {
    quizscore quizUpload = quizScoreRepository.save(Score);
    return ResponseEntity.created(new URI("/quizscores/" + quizUpload.getQId())).body(quizUpload);
    }
}
