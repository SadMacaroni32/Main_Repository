import React, { useContext, useState, useEffect } from "react";
import { CourseContext } from "../context/CourseContext";
import axios from "axios";

const EditChapterTitle = ({ chapterId, onClose, onSaved }) => {
  const { courses, setCourses } = useContext(CourseContext);
  const [chapter, setChapter] = useState({
    chapter_id: "",
    chapter_title: "",
  });

  useEffect(() => {
    loadChapter();
  }, [chapterId]);

  const loadChapter = () => {
    // Find the specific chapter within the courses context
    const selectedChapter = courses.find((course) =>
      course.chapters.find((ch) => ch.chapter_id === chapterId)
    );

    // Set the chapter state
    if (selectedChapter) {
      const foundChapter = selectedChapter.chapters.find(
        (ch) => ch.chapter_id === chapterId
      );
      setChapter(foundChapter);
    }
  };

  const handleInputChange = (e) => {
    setChapter({ ...chapter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the chapter in the courses context
    const updatedCourses = courses.map((course) => {
      if (course.chapters.some((ch) => ch.chapter_id === chapterId)) {
        return {
          ...course,
          chapters: course.chapters.map((ch) =>
            ch.chapter_id === chapterId ? chapter : ch
          ),
        };
      }
      return course;
    });

    try {
      // Make an API call to update the chapter in your backend
      await axios.put(
        `http://localhost:8080/api/chapters/${chapterId}`,
        chapter
      );

      // Update the courses context with the updated chapters
      setCourses(updatedCourses);

      // Trigger the parent component's callback
      onSaved();
      onClose();
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          {/* Your form and UI for editing chapter title */}
          <label>Edit Title</label>
          <input
            type="text"
            name="chapter_title"
            value={chapter.chapter_title}
            onChange={handleInputChange}
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditChapterTitle;
