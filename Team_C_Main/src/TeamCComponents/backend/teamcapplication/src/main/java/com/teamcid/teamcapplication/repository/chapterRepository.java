package com.teamcid.teamcapplication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teamcid.teamcapplication.model.chapter;


public interface chapterRepository extends JpaRepository<chapter, Long>  {
  
    List<chapter> findAll();

    Optional<chapter> findById(Long chapter_id);

    @Query("Select ch FROM chapter ch WHERE ch.course.course_id = :course_id")
    List<chapter> findByCourse_id(@Param("course_id") Long course_id);

}
