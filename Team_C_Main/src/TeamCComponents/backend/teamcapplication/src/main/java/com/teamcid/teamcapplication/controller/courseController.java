// January 24, 2014
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

import com.teamcid.teamcapplication.services.courseService;
import com.teamcid.teamcapplication.model.chapter;
import com.teamcid.teamcapplication.model.course;
import com.teamcid.teamcapplication.repository.courseRepository;

@RestController
@RequestMapping("/api/courses") // Endpoint base path for course related operations
@CrossOrigin("http://localhost:5173") // Allowing requests from this origin
public class courseController {

    @Autowired // Injecting CourseService dependency
    private courseService courseService;

    @Autowired // Injecting CourseRepository dependency
    courseRepository courseRepository;

    // January 22, 2024 modification for organize code and function calling
    
    // API FOR CREATE NEW COURSE
    @PostMapping() // Original user
    course newCourse(@RequestBody course newCourse) { // Creates a new course
        return courseService.saveCourse(newCourse);
    }

    // API FOR GET ALL COURSE BY CALLING COURSE ID
    @GetMapping() 
    List<course> getAllCourse() { // Retrieves all courses
        return courseService.getAllCourse();
    }

    /* January 16, 2024 updating course data and get course by id */

    // Show by id
    // API FOR GET COURSE BY CALLING COURSE ID
    @GetMapping("/{course_id}")
    course getCourseById(@PathVariable Long course_id) { // Retrieves course by its ID
        return courseService.getCourseById(course_id);
    }

    // January 31, 2024
    // API FOR GET COURSE BY CALLING CHAPTER ID
    @GetMapping("/byChapter/{chapter_id}")
    public List<course> getCourseByChapterId(@PathVariable Long chapter_id) { // Retrieves courses by chapter ID
        return courseService.getCourseByChapterId(chapter_id);
    }
    // January 31, 2024

    // API FOR UPDATING COURSE BY CALLING COURSE ID
    @PutMapping("/{course_id}")
    course updateCourse(@RequestBody course newCourse, @PathVariable Long course_id) { // Updates course by its ID
        return courseService.updateCourse(newCourse, course_id);
    }
    /* January 16, 2024 */

    // API FOR DELETING COURSE BY CALLING COURSE ID @DeleteMapping("/{course_id}/chapters/{chapter_id}")
    // public ResponseEntity<?> deleteChapterById(@PathVariable Long course_id, @PathVariable Long chapter_id) {
    //     // Call service method to delete chapter
    //     courseService.deleteChapterById(chapter_id);
    //     return ResponseEntity.ok().build();
    // }

//try
    @DeleteMapping("/{course_id}")
    public String deleteCourse(@PathVariable Long course_id) { // Method signature to delete a chapter by its ID
        return courseService.deleteCourse(course_id);
    }
    //try
    // January 22, 2024 modification for organize code and function calling

    // API for adding chapter inside the course by calling course id
    @PostMapping("/{course_id}/chapters")
    public ResponseEntity<course> addChapterToCourse(@PathVariable Long course_id, @RequestBody chapter chapter) { // Adds chapter to course
        course updatedCourse = courseService.addChapterToCourse(course_id, chapter);
        if (updatedCourse != null) {
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle course not found scenario
    }
}
