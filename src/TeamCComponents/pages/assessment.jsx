import React, { Fragment } from "react";
import { Link } from "react-router-dom";  
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/base_style.css';

function TeamC_Assessments() {
  return (
    <Fragment>
      <Team_D_HeaderV2 />
      <div className="container mt-5 mx-auto">
        <p className="text-left mb-4" style={{ fontSize: '2rem' }}>ASSESSMENTS</p>

        <Link to='/assessment_sql'>
        <div className="card mb-3" id="c_assessment_sql" style={{ borderRadius: '15px', backgroundColor: '#bce8b1' }}>
          <div className="card-body d-flex justify-content-between" >
            <p style={{ color: '#0e3b03' }} className="h4"><b>C Language Programming</b></p>
            <small id="subText" style={{ fontStyle: 'italic', alignSelf: 'center', color: '#0e3b03' }}>-STATUS-</small>
          </div>
        </div>
        </Link>

        <Link to='/assessment_svn'>
        <div className="card mb-3" id="c_assessment_svn" style={{ borderRadius: '15px', backgroundColor: '#bce8b1' }}>
          <div className="card-body d-flex justify-content-between" >
            <p style={{ color: '#0e3b03' }} className="h4"><b>Version Control: Subversion</b></p>
            <small style={{ fontStyle: 'italic', alignSelf: 'center', color: '#0e3b03' }}>-STATUS-</small>
          </div>
        </div>
        </Link>

        <Link to='/assessment_html'>
        <div className="card mb-3" id="c_assessment_html" style={{ borderRadius: '15px', backgroundColor: '#bce8b1' }}>
          <div className="card-body d-flex justify-content-between" >
            <p style={{ color: '#0e3b03' }} className="h4"><b>HTML Programming</b></p>
            <small style={{ fontStyle: 'italic', alignSelf: 'center', color: '#0e3b03' }}>-STATUS-</small>
          </div>
        </div>
        </Link>
      
      </div>
      

      {/* Bootstrap with Popper */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </Fragment>
  )
}

export default TeamC_Assessments;
