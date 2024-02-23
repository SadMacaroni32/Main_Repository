// Source code is decompiled from a .class file using FernFlower decompiler.
package com.teamcid.teamcapplication.controller;

import com.teamcid.teamcapplication.model.course;
import com.teamcid.teamcapplication.repository.chapterRepository;
import com.teamcid.teamcapplication.repository.courseRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/course/chapter"})
@CrossOrigin({"http://localhost:5173"})
public class chapterCourseController {
   @Autowired
   private courseRepository courseRepository;
   @Autowired
   private chapterRepository chapterRepository;

   public chapterCourseController(courseRepository courseRepository, chapterRepository chapterRepository) {
      this.courseRepository = courseRepository;
      this.chapterRepository = chapterRepository;
   }

   @PostMapping
   public course saveCourseWithChapter(@RequestBody course course) {
      return (course)this.courseRepository.save(course);
   }

   @GetMapping
   public List<course> findAllCourse() {
      return this.courseRepository.findAll();
   }

   @GetMapping({"/{course_id}"})
   public course findCourse(@PathVariable Long course_id) {
      return (course)this.courseRepository.findById(course_id).orElse(null);
   }
}
