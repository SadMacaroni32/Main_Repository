package com.backend.integration.Controller;
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

import com.backend.integration.Entity.Chapter; 
import com.backend.integration.Entity.Course;
import com.backend.integration.Repo.CourseRepository; 
import com.backend.integration.Service.CourseService; 

@RestController // Marks the class as a REST controller
@RequestMapping("/api/v1/auth") // Base path for course related operations
@CrossOrigin("http://localhost:5173") // Allowing requests from this origin
public class CourseController {

    @Autowired // Injection of CourseService dependency
    private CourseService courseService;

    @Autowired // Injection of CourseRepository dependency
    CourseRepository courseRepository;

    // API FOR CREATE NEW COURSE
    @PostMapping("/postCourses") // Endpoint for creating a new course
    Course newCourse(@RequestBody Course newCourse) { // Creates a new course
        return courseService.saveCourse(newCourse);
    }

    // API FOR GET ALL COURSES
    @GetMapping("/getCourses") // Endpoint for getting all courses
    List<Course> getAllCourse() { // Retrieves all courses
        return courseService.getAllCourse();
    }

    // API FOR GETTING COURSE BY ID
    @GetMapping("/course/{course_id}") // Endpoint for getting a course by its ID
    Course getCourseById(@PathVariable Long course_id) { // Retrieves course by its ID
        return courseService.getCourseById(course_id);
    }

    // API FOR GETTING COURSES BY CHAPTER ID
    @GetMapping("/byChapter/{chapter_id}") // Endpoint for getting courses by chapter ID
    public List<Course> getCourseByChapterId(@PathVariable Long chapter_id) { // Retrieves courses by chapter ID
        return courseService.getCourseByChapterId(chapter_id);
    }

    // API FOR UPDATING COURSE BY ID
    @PutMapping("/course/{course_id}") // Endpoint for updating a course by its ID
    Course updateCourse(@RequestBody Course newCourse, @PathVariable Long course_id) { // Updates course by its ID
        return courseService.updateCourse(newCourse, course_id);
    }

    // API FOR DELETING COURSE BY ID
    @DeleteMapping("/course/{course_id}") // Endpoint for deleting a course by its ID
    public String deleteCourse(@PathVariable Long course_id) { // Method signature to delete a course by its ID
        return courseService.deleteCourse(course_id);
    }

    // API FOR ADDING CHAPTER TO COURSE
    @PostMapping("/course/{course_id}/chapters") // Endpoint for adding a chapter to a course
    // Adds chapter to course
    public ResponseEntity<Course> addChapterToCourse(@PathVariable Long course_id, @RequestBody Chapter chapter) {
        Course updatedCourse = courseService.addChapterToCourse(course_id, chapter);
        if (updatedCourse != null) {
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle course not found scenario
    }
}
