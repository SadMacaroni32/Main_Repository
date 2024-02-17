import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/base_style.css';
import axios from "axios";

{/* This function is to see the title of the assessment and the status of it.*/}
function TeamC_Assessments() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chapter");
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <Fragment>
      <Team_D_HeaderV2 />
      <div className="container mt-5 mx-auto">
        <p className="text-left mb-4" style={{ fontSize: '2rem' }}>ASSESSMENTS</p>
        {chapters.map((chapter, index) => (
        <Link to='/assessment_sql'>
        <div className="card mb-3" id="c_assessment_sql" style={{ borderRadius: '15px', backgroundColor: '#bce8b1' }}>
          <div className="card-body d-flex justify-content-between" >
            <p style={{ color: '#0e3b03' }} className="h4"><b>{chapter.chapterTitle}</b></p>
            <small id="subText" style={{ fontStyle: 'italic', alignSelf: 'center', color: '#0e3b03' }}>-STATUS-</small>
          </div>
        </div>
        </Link>
        ))}
      </div>
      

      {/* Bootstrap with Popper */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </Fragment>
  )
}

export default TeamC_Assessments;
