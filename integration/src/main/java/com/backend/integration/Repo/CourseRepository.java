package com.backend.integration.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.integration.Entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
    // Interface definition for CourseRepository extending JpaRepository for Course entity with Long as the ID type

    List<Course> findAll(); // Method to find all courses

    Optional<Course> findById(Long course_id); // Method to find a course by its ID

    // Custom query to find courses by chapter ID using named parameter ":chapter_id"
    @Query("SELECT DISTINCT c FROM Course c JOIN c.chapter ch WHERE ch.chapter_id = :chapter_id")
    List<Course> findByChapterId(@Param("chapter_id") Long chapter_id);
}
