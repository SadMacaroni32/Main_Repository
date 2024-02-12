package com.teamcdatabase.teamcdatabase.controller;
import org.springframework.lang.NonNull;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.teamcdatabase.teamcdatabase.model.Quiz;
import com.teamcdatabase.teamcdatabase.repository.QuizRepository;



@RestController
@CrossOrigin("http://localhost:5173/src/TeamCComponents/pages/chapter_sql")
public class QuizController {
    @Autowired
    private QuizRepository quizRepository;

    @PostMapping("/quiz")
    Quiz newQuiz(@RequestBody @NonNull Quiz newQuiz){
        return quizRepository.save(newQuiz);
    }

    @GetMapping("/quizzes")
    List<Quiz> getAllQuizs(){
        return quizRepository.findAll();
    }

}
