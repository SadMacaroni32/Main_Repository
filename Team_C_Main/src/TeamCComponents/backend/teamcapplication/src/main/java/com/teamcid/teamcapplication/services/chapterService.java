// Source code is decompiled from a .class file using FernFlower decompiler.
package com.teamcid.teamcapplication.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.teamcid.teamcapplication.exception.chapterNotFoundException;
import com.teamcid.teamcapplication.model.chapter;
import com.teamcid.teamcapplication.repository.chapterRepository;

@Service
public class chapterService {
    @Autowired // Annotation for dependency injection of ChapterRepository bean
    private chapterRepository chapterRepository; // Declaration of ChapterRepository bean

    // Function to retrieve all chapters
    public List<chapter> getAllChapter() { // Method signature to retrieve all chapters
        return chapterRepository.findAll(); // refers to findAll() method of ChapterRepository interface
    }

    // Function to retrieve a chapter by its ID
    public chapter getChapterById(Long chapter_id) { // Method signature to retrieve a chapter by its ID
        return chapterRepository.findById(chapter_id) // refers to findById() method of ChapterRepository interface
                .orElseThrow(() -> new chapterNotFoundException(chapter_id)); // Handling ChapterNotFoundException
    }

    // Function to update a chapter
    public chapter updateChapter(@RequestBody chapter newChapter, @PathVariable Long chapter_id) { // Method signature to update a chapter
        return chapterRepository.findById(chapter_id) // refers to findById() method of ChapterRepository interface
                .map(chapter -> { // Using map() to apply changes
                    chapter.setChapter_title(newChapter.getChapter_title()); // Updating chapter title
                    chapter.setChapter_date_created(newChapter.getChapter_date_created()); // Updating chapter creation date
                    return chapterRepository.save(chapter); // Saving updated chapter
                }).orElseThrow(() -> new chapterNotFoundException(chapter_id)); // Handling ChapterNotFoundException
    }

    // Function to delete a chapter by its ID
    public String deleteChapter(@PathVariable Long chapter_id) { // Method signature to delete a chapter by its ID
        if (!chapterRepository.existsById(chapter_id)) { // Checking if chapter exists
            throw new chapterNotFoundException(chapter_id); // Throwing ChapterNotFoundException if chapter not found
        }
        chapterRepository.deleteById(chapter_id); // Deleting chapter
        return "Chapter with id " + chapter_id + " has been successfully deleted"; // Returning success message
    }

    // Function to retrieve chapters by course ID
    public List<chapter> getChapterByCourseId(Long course_id) { // Method signature to retrieve chapters by course ID
        return chapterRepository.findByCourse_id(course_id); // refers to findByCourse_id() method of ChapterRepository interface
    }

    //febraury 13 2024
    // Function to save a new chapter
    public chapter saveChapter(@RequestBody chapter newChapter) { // Method signature to save a new chapter
        // Printing chapter details
        System.out.println("Chapter Title: " + newChapter.getChapter_title());
        System.out.println("Chapter Date Created: " + newChapter.getChapter_date_created());
        return chapterRepository.save(newChapter);
    }

}
