import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../TeamCComponents/css/base_style.css";
import { incrementAttributes } from "../js/script";

function CoursePreview() {
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [buttonCounter, setButtonCounter] = useState(1); // Initialize button counter

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/courses");
        console.log("Response Data:", response.data); // Log response data
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setError(error.message);
      }
    };

    fetchChapters();
  }, []);

  const incrementCounterAndAttributes = () => {
    setButtonCounter(prevCounter => prevCounter + 1); // Increment button counter
    incrementAttributes(); // Call incrementAttributes function from script
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="card-container" id="c_cardview_sql" data-card="course_sql">
        <div className="row" id="c_cardpreview_cardouter">
          {chapters.map((chapterData, index) => {
            const buttonId = `enrollButton${index + 1}`;
            const modalId = `modal${index + 1}`;

            return (
              <div key={index} className="col-md-3 mt-3 ml-1">
                <div className="card border-success h-100" style={{ maxWidth: '20rem', borderRadius: '10px' }}>
                  <div className="card-header bg-transparent border-success "></div>
                  <div className="card mb-4">
                    <div className="card-body ">
                      <h5 className="card-title fw-bold text-center text-success" style={{ fontSize: '1.7rem' }}>{chapterData.course_title}</h5>
                      <hr/>
                      <p className="card-body bg-transparent border-success d-flex flex-column text-justify">{chapterData.course_description}</p>
                      <p className="fw-bold text-end" id='c_course_seemoretext' data-bs-toggle="modal" data-bs-target={`#modal_seemore${index + 1}`} onClick={incrementCounterAndAttributes}>See more..</p>
                      <div ><br /></div>
                      <button
                        className="btn btn-success d-grid gap-2 col-6 mx-auto d-flex badge text-wrap"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                        id={buttonId}
                        onClick={incrementCounterAndAttributes}>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CoursePreview;
