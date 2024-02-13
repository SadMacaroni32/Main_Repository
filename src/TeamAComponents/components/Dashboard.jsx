  /* eslint-disable no-unused-vars */
  import React, {Fragment, useState} from "react";
  import { Link } from "react-router-dom";
  import { useAuth } from "./AuthContext"; // Make sure to import your auth context
  import "../styles/Auth.css";
  import Footer from "./Footer";
  import CoursePreview from "./CoursePreview";
  import ProfileModal from "./ProfileModal";
  import UserNavigation from "./UserNavigation";

  const Dashboard = () => {
    const { isLoggedIn, handleLogout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  
    const handleOpenModal = () => {
      setShowModal(true);
      setShowEditModal(false); // Ensure that Edit Modal is closed when Profile Modal is opened
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setShowEditModal(false); // Ensure that Edit Modal is closed when Profile Modal is closed
    };
  
    const handleOpenEditModal = () => {
      setShowEditModal(true);
      setShowModal(false); // Ensure that Profile Modal is closed when Edit Modal is opened
    };
  
    const handleCloseEditModal = () => {
      setShowEditModal(false);
    };
   
    return (
      <Fragment>
        <UserNavigation
          openModal={handleOpenModal}
          openEditModal={handleOpenEditModal} // Pass the openEditModal function
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <div className="header p-3 h-50 d-flex align-items-center justify-content-center" id="c_dashboard_header">
          <ProfileModal
            showModal={showModal}
            handleClose={handleCloseModal}
            showEditModal={showEditModal} // Pass showEditModal to ProfileModal
            handleEditClose={handleCloseEditModal} // Pass handleEditClose to ProfileModal
          />
          <div className="c_dashboard_title title p-3 text-center">
            <div className="c_dashboard_japchar jap-char">
              <h1 className="c_dashboard_char fw-bold" id="c_preview_headerTitle">
                月伝で自分のやり方を学びましょう。
              </h1>
            </div>
            <div className="eng-char" id="c_preview_headerSub">
              <h4 id="c_preview_headerSub fw-bold">Learn your way at Tsukiden.</h4>
            </div>
          </div>
        </div>
        {/* End of Header title */}
  
        {/* Course Previews */}
        <div className="course-title">
          <h1 className="course-prev fw-bold text-center mt-5" id="c_preview_headerTitle">   
            Course Previews
          </h1>
        </div>
  
        {/* Courses */}
        <CoursePreview />
        {/* End of Courses */}
  
        {/* Modals */}
        {/* MODAL SQL */}
        <div
          className="modal-sql modal fade"
          id="modalSql"
          tabIndex="-1"
          aria-labelledby="modalSql"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalSql">
                  The SQL Query Course
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>You will be enrolled in this course.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                  data-bs-dismiss="modal"
                  onClick={() => enroll(1)}
                >
                  Enroll
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* MODAL SUBVERSION */}
        <div
          className="modal fade"
          id="modalSvn"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalSvn">
                  The Subversion Course
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>You will be enrolled in this course.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                  data-bs-dismiss="modal"
                  onClick={() => enroll(2)}
                >
                  Enroll
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* MODAL HTML PROGRAMMING */}
        <div
          className="modal fade"
          id="modalHtml"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel3"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalHtml">
                  HTML Programming Course
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>You will be enrolled in this course.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                  data-bs-dismiss="modal"
                  onClick={() => enroll(3)}
                >
                  Enroll
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#0e3b03",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="footerContainer d-flex flex-column align-items-center"
          style={{ color: "#0e3b03", minHeight: "1vh" }}
        ><br/>
          <div className="flex-grow-1"></div>
          <p className="footerText text-center">
          </p>

        </div>
  
        {/* End of Modals */}
        <Footer/>
      </Fragment>
    );
  }
  
  export default Dashboard;
  