package com.teamcid.teamcapplication.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamcid.teamcapplication.model.quizscore;

public interface quizRepository extends JpaRepository<quizscore, Long> {

}
