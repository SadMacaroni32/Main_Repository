import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../TeamCComponents/css/base_style.css';
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";

function TeamC_ChapterSvn() {
  return (
    <>
      <Team_D_HeaderV2 />
      <div className="container mt-5 mx-auto" id="c_course_maincontainer">
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Program Overview</h2>
        <hr />

        {/* Chapter 1 */}
        <div className="d-flex align-items-center" id="c_course_itemcontainer">

          <div className='d-flex align-items-center justify-content-center' id="c_course_tag">
            <span id="c_course_tagtext">BSQL-01</span>
          </div>

          <div className="c_course_cardmain card flex-grow-1" style={{ marginTop: '10px', willChange: 'filter', transition: 'filter 300ms', backgroundColor: '#126912', borderRadius: '1rem', }}>
            <Link to="/chapters_sql" className="h4 text-white text-decoration-none c_chapter_cardtext">
              <div className="card-body d-flex" id="c_course_cardbody" style={{ backgroundColor: '#126912', borderRadius: '1rem', }}>
                The SQL Query
              </div>
            </Link>
          </div>

        </div>

        {/* Chapter 2 */}
        <div className="d-flex align-items-center" id="c_course_itemcontainer">

          <div className='d-flex align-items-center justify-content-center' id="c_course_tag">
            <span id="c_course_tagtext">BSVN-01</span>
          </div>

          <div className="c_course_cardmain card flex-grow-1" style={{ marginTop: '10px', willChange: 'filter', transition: 'filter 300ms', backgroundColor: '#126912', borderRadius: '1rem', }}>
            <Link to="/chapters_svn" className="h4 text-white text-decoration-none c_chapter_cardtext">
              <div className="card-body d-flex" id="c_course_cardbody" style={{ backgroundColor: '#126912', borderRadium: '1rem', }}>
                Version Control: Subversion
              </div>
            </Link>
          </div>
        </div>

        {/* Chapter 3 */}
        <div className="d-flex align-items-center" id="c_course_itemcontainer">

          <div className='d-flex align-items-center justify-content-center' id="c_course_tag">
            <span id="c_course_tagtext">BHPROG-01</span>
          </div>

          <div className="c_course_cardmain card flex-grow-1" style={{ marginTop: '10px', willChange: 'filter', transition: 'filter 300ms', backgroundColor: '#126912', borderRadius: '1rem', }}>
            <Link to="/chapters_hprog" className="h4 text-white text-decoration-none c_chapter_cardtext">
              <div className="card-body d-flex" id="c_course_cardbody" style={{ backgroundColor: '#126912', borderRadius: '1rem', }}>
                HTML Programming Language
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamC_ChapterSvn;
