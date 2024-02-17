package com.teamcid.teamcapplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.teamcid.teamcapplication.repository.chapterRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.teamcid.teamcapplication.model.chapter;

@RestController
@CrossOrigin("http://localhost:5173/")
public class chapterController {

        @Autowired
        private chapterRepository ChapterRepository;

        @GetMapping("/chapter")                                                                                                                                                             
        public List<chapter> getChapter(){
            return ChapterRepository.findAll();
        }
        
        
}
