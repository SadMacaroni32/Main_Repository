package com.backend.integration.Repo;

import java.util.List;
import java.util.Optional; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.integration.Entity.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    // Interface definition for ChapterRepository extending JpaRepository for Chapter entity with Long as the ID type

    List<Chapter> findAll(); // Method to find all chapters

    Optional<Chapter> findById(Long chapter_id); // Method to find a chapter by its ID

    // Custom query to find chapters by course ID using named parameter ":course_id"
    @Query("SELECT ch FROM Chapter ch WHERE ch.course.course_id = :course_id")
    List<Chapter> findByCourse_id(@Param("course_id") Long course_id);

    // Custom query to find chapters by topic ID using named parameter ":topic_id"
    @Query("SELECT DISTINCT ch FROM Chapter ch JOIN ch.topic t WHERE t.topic_id = :topic_id")
    List<Chapter> findByTopicId(@Param("topic_id") Long topic_id);
}
