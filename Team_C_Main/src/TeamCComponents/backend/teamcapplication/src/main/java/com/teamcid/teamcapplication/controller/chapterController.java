package com.teamcid.teamcapplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamcid.teamcapplication.services.chapterService;
import com.teamcid.teamcapplication.model.chapter;

@RestController
@RequestMapping("/api/chapters") // Endpoint base path for chapter related operations
@CrossOrigin("http://localhost:5173") // Allowing requests from this origin
public class chapterController {
    
    @Autowired // Injecting ChapterService dependency
    private chapterService chapterService;

    // POST MAPPING FOR CREATING NEW CHAPTER
    @PostMapping() 
    public chapter saveChapter(@RequestBody chapter newChapter) { // Saves a new chapter
        return chapterService.saveChapter(newChapter);
    }

    // GET MAPPING FOR GETTING ALL CHAPTERS
    @GetMapping() 
    List<chapter> getAllChapter() { // Retrieves all chapters
        return chapterService.getAllChapter();
    }

    // GET MAPPING FOR GETTING CHAPTERS BY ID
    @GetMapping("/{chapter_id}")
    chapter getChapterById(@PathVariable Long chapter_id) { // Retrieves chapter by its ID
        return chapterService.getChapterById(chapter_id);
    }

    // PUT MAPPING FOR UPDATING CHAPTERS BY ID
    @PutMapping("/{chapter_id}")
    chapter updateChapter(@RequestBody chapter newChapter, @PathVariable Long chapter_id) { // Updates chapter by its ID
        return chapterService.updateChapter(newChapter, chapter_id);
    }

    // DELETE MAPPING TO UPDATE CHAPTERS BY ID
    @DeleteMapping("/{chapter_id}")
    String deleteChapter(@PathVariable Long chapter_id) { // Deletes chapter by its ID
        return chapterService.deleteChapter(chapter_id);
    }

    // GET MAPPING TO GETTING CHAPTERS BY COURSE ID
    @GetMapping("/byCourse/{course_id}")
    public List<chapter> getChapterByCourseId(@PathVariable Long course_id) { // Retrieves chapters by course ID
        return chapterService.getChapterByCourseId(course_id);
    }


}
