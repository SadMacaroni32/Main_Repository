//january 13 2024
package com.teamcid.teamcapplication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teamcid.teamcapplication.model.course;

public interface courseRepository extends JpaRepository<course, Long> {

    List<course> findAll();

    Optional<course> findById(Long course_id);

    @Query("SELECT DISTINCT c FROM course c JOIN c.chapter ch WHERE ch.chapter_id = :chapter_id")
    List<course> findByChapterId(@Param("chapter_id") Long chapter_id);
}

// january 13 2024