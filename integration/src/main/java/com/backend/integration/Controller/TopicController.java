package com.backend.integration.Controller; 

import java.io.IOException; 
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; 
import org.springframework.web.multipart.MultipartFile;

import com.backend.integration.Entity.Topic;
import com.backend.integration.Service.TopicService; 

// Controller class for handling topic-related operations
@RestController
@RequestMapping("/api/v1/auth") // Base path for topic related operations
@CrossOrigin("http://localhost:5173") // Allowing requests from this origin
public class TopicController {

    @Autowired // Injection of TopicService dependency
    private TopicService topicService;

    // Method for handling file upload and topic creation
    @PostMapping("/uploadTopic")
    public ResponseEntity<String> uploadTopic(@RequestParam("topic_title") String topic_title,
            @RequestParam("topic_file") MultipartFile topic_file,
            @RequestParam("topic_description") String topic_description) {
        if (topic_file.isEmpty()) { // Check if the file is empty
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            byte[] bytes = topic_file.getBytes(); // Read file bytes
            String originalFilename = topic_file.getOriginalFilename(); // Get original filename
            @SuppressWarnings("null")
            String filenameWithoutPrefix = originalFilename.startsWith("PPT") ? originalFilename.substring(3)
                    : originalFilename; // Remove prefix if present

            // Save the file to a directory or cloud storage (you can use a service for
            // this)
            topicService.saveTopicFile(bytes, filenameWithoutPrefix);

            // Now, save the topic details to the database
            Topic topic = new Topic();
            topic.setTopic_title(topic_title);
            topic.setTopic_file(bytes);
            topic.setTopic_description(topic_description);

            topicService.saveTopic(topic); // Save topic to the database

            return ResponseEntity.ok("Topic saved successfully");
        } catch (IOException e) { // Catch IO exception if file saving fails
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save topic: " + e.getMessage());
        }
    }

    // Method for retrieving all topics
    @GetMapping("/getTopic")
    List<Topic> getAllTopic() { // Retrieves all topics
        return topicService.getAllTopic();
    }

    // Method for retrieving a topic by its ID
    @GetMapping("/topic/{topic_id}")
    Topic getTopicById(@PathVariable Long topic_id) { // Retrieves topic by its ID
        return topicService.getTopicById(topic_id);
    }

    // Method for updating a topic by its ID
    @PutMapping("/topic/{topic_id}")
    Topic updateTopic(@RequestBody Topic newTopic, @PathVariable Long topic_id) { // Updates topic by its ID
        return topicService.updateTopic(newTopic, topic_id);
    }

    // Method for deleting a topic by its ID
    @DeleteMapping("/topic/{topic_id}")
    String deleteTopic(@PathVariable Long topic_id) { // Deletes topic by its ID
        return topicService.deleteTopic(topic_id);
    }
}
