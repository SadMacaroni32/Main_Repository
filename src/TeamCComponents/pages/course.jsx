import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../TeamCComponents/css/base_style.css';
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import axios from "axios";

function TeamC_ChapterSvn() {
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
    <>
      {/*Navbar Component*/}
      <Team_D_HeaderV2 />
      <div className="container mt-5 mx-auto" id="c_course_maincontainer">
        {/* Program Overview Title */}
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Program Overview</h2>
        <hr />

        {chapters.map((chapter, index) => (
          <div key={index} className="d-flex align-items-center">
            {/* Chapter Tag */}
            <div className='d-flex align-items-center justify-content-center' id="c_course_tag">
              <span id="c_course_tagtext">BSQL-01</span>
            </div>

            {/* Chapter Card */}
            <div className="c_course_cardmain card flex-grow-1" style={{ marginTop: '10px', willChange: 'filter', transition: 'filter 300ms', backgroundColor: '#126912', borderRadius: '1rem', }}>
              {/* Chapter Link */}
              <Link to="/chapters_sql" className="h4 text-white text-decoration-none c_chapter_cardtext">
                {/* Chapter Card Body */}
                <div className="card-body d-flex" id="c_course_cardbody" style={{ backgroundColor: '#126912', borderRadius: '1rem', }}>
                  {chapter.chapterTitle}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TeamC_ChapterSvn;
