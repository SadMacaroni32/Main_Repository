import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function ModalSeeMore() {
    return (
        <>
            {/* Modal for SQL Course */}
            <div className="modal fade" id="modal_seemoresql" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="exampleModalLongTitle">The SQL Query</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Description of SQL course */}
                            In a SQL querying workshop, participants delve into fundamental concepts such as syntax, database design, and optimization, empowering them with practical skills to write efficient queries.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "#0e3b03", color: "#ffffff", borderRadius: "20px", fontSize: "15px", }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Subversion Course */}
            <div className="modal fade" id="modal_seemoresvn" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="exampleModalLongTitle">Version Control: Subversion</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Description of Subversion course */}
                            Apache Subversion (SVN) is a centralized version control system, facilitating collaborative software development through version tracking, allowing multiple developers to work on projects concurrently.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "#0e3b03", color: "#ffffff", borderRadius: "20px", fontSize: "15px", }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for HTML Programming Course */}
            <div className="modal fade" id="modal_seemorehtml" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ backgroundColor: "#D9FFCF" }}>
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="exampleModalLongTitle">HTML Programming</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Description of HTML Programming course */}
                            HTML (Hypertext Markup Language) is the standard language for creating web pages, defining the structure and content using tags, ensuring compatibility and accessibility across various browsers.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "#0e3b03", color: "#ffffff", borderRadius: "20px", fontSize: "15px", }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalSeeMore;
