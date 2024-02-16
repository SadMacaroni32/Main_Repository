// Import React and necessary hooks and components
import React, { useState, useEffect } from "react";

import "./TeamD_Css/content.css";
import { pdfjs } from "react-pdf";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiFileFind } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaArrowUp } from "react-icons/fa";
import Team_D_HeaderV2 from "./Team_D_HeaderV2";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Defining the Team_D_Content component
const Team_D_Content = () => {
  // Setting initial values for state variables using useState hook
  const pdfPath = "public/PDF/Sample.pdf"; // Path to the PDF file
  const [data, setData] = useState({ // State variable for PDF data
    id: "1",
    pdfName: "Sample.pdf",
    courseTitle: "HTML and CSS",
  });
  const [thumbnailUrl, setThumbnailUrl] = useState(null); // State variable for thumbnail URL
  const [showNotification, setShowNotification] = useState(false); // State variable for notification visibility
  const [disableDownloadButton, setDisableDownloadButton] = useState(false); // State variable for disabling download button
  const [enableButtonClick, setEnableButtonClick] = useState(true); // State variable for enabling button click
  const [overlayVisible, setOverlayVisible] = useState(false); // State variable for overlay visibility
  const [disableViewButton, setDisableViewButton] = useState(false); // State variable for disabling view button
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769); // State variable for detecting mobile view

  // Function to handle window resize
  const handleResize = () => {
    setIsMobile(window.innerWidth < 769); // Update isMobile state based on window width
  };

  // useEffect hook to handle side effects
  useEffect(() => {
    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once during mount and unmount

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    // Check if not in mobile view
    if (!isMobile) {
      setOverlayVisible(true); // Show the overlay
      setDisableViewButton(true); // Disable the view button when overlay is visible
    }
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    // Check if not in mobile view
    if (!isMobile) {
      setOverlayVisible(false); // Hide the overlay
      setTimeout(() => {
        setDisableViewButton(false); // Enable the view button when overlay is not visible
      }, 0);
    }
  };

  // useEffect hook to handle side effects
  useEffect(() => {
    // Function to fetch thumbnail of the PDF
    const fetchThumbnail = async () => {
      try {
        // Load the PDF document
        const loadingTask = pdfjs.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Get the first page of the PDF

        // Get the viewport of the page
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas"); // Create a canvas element
        const context = canvas.getContext("2d");
        canvas.width = viewport.width; // Set canvas width
        canvas.height = viewport.height; // Set canvas height

        // Set up rendering context
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // Render the page content onto the canvas
        await page.render(renderContext).promise;

        // Convert canvas content to data URL (thumbnail)
        const dataUrl = canvas.toDataURL();
        setThumbnailUrl(dataUrl); // Set the thumbnail URL
      } catch (error) {
        console.error("Error loading PDF:", error); // Log error if loading fails
      }
    };

    // Call the fetchThumbnail function
    fetchThumbnail();
  }, [pdfPath]);

  // useEffect hook to handle online/offline events
  useEffect(() => {
    // Function to handle online event
    const handleOnline = () => {
      // Show info notification when back online
      setShowNotification({
        type: "info",
        message: "You are back online! You can now download certificates.",
      });

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    };

    // Function to handle offline event
    const handleOffline = () => {
      // Show danger notification when offline
      setShowNotification({
        type: "danger",
        message: "You are currently offline. Please connect to the internet.",
      });

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    };

    // Add event listeners for online/offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up by removing event listeners when component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Function to handle download button click
  const handleDownloadClick = () => {
    // If overlay is not visible, reset button states and return
    if (!overlayVisible) {
      setDisableDownloadButton(false);
      setEnableButtonClick(true);
      return;
    }

    // If download button is disabled or download is not enabled, return
    if (disableDownloadButton || !enableButtonClick) {
      return;
    }

    // If user is offline, show notification and return
    if (!window.navigator.onLine) {
      setShowNotification({
        type: "danger",
        message:
          "You are currently offline. Please connect to the internet and try again.",
      });
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
      return;
    }
    // Create a link element for downloading the PDF
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Certificate.pdf";

    // Event listeners for download errors
    link.addEventListener("abort", () => {
      setShowNotification({
        type: "danger",
        message: "Download aborted. Please try again.",
      });
    });

    link.addEventListener("error", () => {
      setShowNotification({
        type: "danger",
        message: "Error during download. Please try again.",
      });
    });

    link.click(); // Simulate a click on the link to trigger download

    // Show success notification
    setShowNotification({
      type: "success",
      message: "Download successful!",
    });

    // Disable download button temporarily and reset button states after 5 seconds
    setDisableDownloadButton(true);
    setTimeout(() => {
      setDisableDownloadButton(false);
      setShowNotification(null);
    }, 5000);

    // Disable button click temporarily
    setEnableButtonClick(false);
    setTimeout(() => {
      setEnableButtonClick(true);
    }, 0);

    // Hide overlay
    setTimeout(() => {
      setOverlayVisible(false);
    }, 0);
  };

  // Function to handle view button click
  const handleViewClick = () => {
    // If overlay is not visible, reset button states and return
    if (!overlayVisible) {
      setEnableButtonClick(true);
      setDisableViewButton(false);
      return;
    }

    // If view button is not enabled or disable view button is set, return
    if (!enableButtonClick || disableViewButton) {
      return;
    }

    // Temporarily disable pointer events for view link and button
    const link = document.getElementById("viewLink");
    const viewButton = document.getElementById("viewButton");

    if (link) {
      link.style.pointerEvents = "none";
    }

    if (viewButton) {
      viewButton.style.pointerEvents = "none";
    }

    // Show info notification
    setShowNotification({
      type: "info",
      message: "Viewing is disabled for 5 seconds.",
    });

    setDisableViewButton(true);
    setTimeout(() => {
      // Enable pointer events for view link and button after a short delay
      if (link) {
        link.style.pointerEvents = "auto";
      }

      if (viewButton) {
        viewButton.style.pointerEvents = "auto";
      }
      // Reset disableViewButton and hide notification
      setDisableViewButton(false);
      setShowNotification(null);
    }, 0);
  };

  // Function to handle scroll to top button click
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Tooltip for view button
  const viewTooltip = <Tooltip id="viewTooltip">View Certificate</Tooltip>;
  // Tooltip for download button
  const downloadTooltip = (
    <Tooltip id="downloadTooltip">Download Certificate</Tooltip>
  );

  const shouldShowScrollToTop = window.scrollY > 200;

  return (
    <div>
      <Team_D_HeaderV2 />
      <section className="TeamD_content">
        <section className="withSearchBar">
          <h1>Certificate</h1>
          <InputGroup expand="lg" size="sm" className="float-right">
            <Form.Control
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="success" id="button-addon2">
              <FiSearch className="TeamD_icon search_icon" />
            </Button>
          </InputGroup>
        </section>
        <div className="hr"></div>
      </section>
      <section className="certificates">
        <div
          className="certificate_thumbnail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cert">
            {isMobile && thumbnailUrl ? (
              <Link to="/viewCert" state={{ data: data }}>
                <div className="overlay"></div>
                <img src={thumbnailUrl} alt="PDF Thumbnail"/>
              </Link>
            ) : !isMobile && thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            {!isMobile && (
              <div className={`overlay${overlayVisible ? " visible" : ""}`}>
                {thumbnailUrl && (
                  <div className="buttons">
                    <Link id="viewLink" to="/viewCert" state={{ data: data }}>
                      <OverlayTrigger placement="top" overlay={viewTooltip}>
                        <button
                          id="viewButton"
                          className="view"
                          style={{
                            pointerEvents: overlayVisible ? "auto" : "none",
                          }}
                          onClick={handleViewClick}
                        >
                          <BiFileFind className="TeamD_icon view_icon" />
                        </button>
                      </OverlayTrigger>
                    </Link>
                    <OverlayTrigger placement="top" overlay={downloadTooltip}>
                      <button
                        className="download"
                        style={{
                          pointerEvents: overlayVisible ? "auto" : "none",
                        }}
                        onClick={handleDownloadClick}
                        disabled={!enableButtonClick || disableDownloadButton}
                      >
                        <MdOutlineFileDownload className="TeamD_icon download_icon" />
                      </button>
                    </OverlayTrigger>
                  </div>
                )}
              </div>
            )}
          </div>
          <p>Course Title</p>
        </div>
        <div
          className="certificate_thumbnail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cert">
            {isMobile && thumbnailUrl ? (
              <Link to="/viewCert" state={{ data: data }}>
                <div className="overlay"></div>
                <img src={thumbnailUrl} alt="PDF Thumbnail" />
              </Link>
            ) : !isMobile && thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            {!isMobile && (
              <div className={`overlay${overlayVisible ? " visible" : ""}`}>
                {thumbnailUrl && (
                  <div className="buttons">
                    <Link id="viewLink" to="/viewCert" state={{ data: data }}>
                      <OverlayTrigger placement="top" overlay={viewTooltip}>
                        <button
                          id="viewButton"
                          className="view"
                          style={{
                            pointerEvents: overlayVisible ? "auto" : "none",
                          }}
                          onClick={handleViewClick}
                        >
                          <BiFileFind className="TeamD_icon view_icon" />
                        </button>
                      </OverlayTrigger>
                    </Link>
                    <OverlayTrigger placement="top" overlay={downloadTooltip}>
                      <button
                        className="download"
                        style={{
                          pointerEvents: overlayVisible ? "auto" : "none",
                        }}
                        onClick={handleDownloadClick}
                        disabled={!enableButtonClick || disableDownloadButton}
                      >
                        <MdOutlineFileDownload className="TeamD_icon download_icon" />
                      </button>
                    </OverlayTrigger>
                  </div>
                )}
              </div>
            )}
          </div>
          <p>Course Title</p>
        </div>
        <div
          className="certificate_thumbnail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cert">
            {isMobile && thumbnailUrl ? (
              <Link to="/viewCert" state={{ data: data }}>
                <div className="overlay"></div>
                <img src={thumbnailUrl} alt="PDF Thumbnail" />
              </Link>
            ) : !isMobile && thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            {!isMobile && (
              <div className={`overlay${overlayVisible ? " visible" : ""}`}>
                {thumbnailUrl && (
                  <div className="buttons">
                    <Link id="viewLink" to="/viewCert" state={{ data: data }}>
                      <OverlayTrigger placement="top" overlay={viewTooltip}>
                        <button
                          id="viewButton"
                          className="view"
                          style={{
                            pointerEvents: overlayVisible ? "auto" : "none",
                          }}
                          onClick={handleViewClick}
                        >
                          <BiFileFind className="TeamD_icon view_icon" />
                        </button>
                      </OverlayTrigger>
                    </Link>
                    <OverlayTrigger placement="top" overlay={downloadTooltip}>
                      <button
                        className="download"
                        style={{
                          pointerEvents: overlayVisible ? "auto" : "none",
                        }}
                        onClick={handleDownloadClick}
                        disabled={!enableButtonClick || disableDownloadButton}
                      >
                        <MdOutlineFileDownload className="TeamD_icon download_icon" />
                      </button>
                    </OverlayTrigger>
                  </div>
                )}
              </div>
            )}
          </div>
          <p>Course Title</p>
        </div>
        <div
          className="certificate_thumbnail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cert">
            {isMobile && thumbnailUrl ? (
              <Link to="/viewCert" state={{ data: data }}>
                <div className="overlay"></div>
                <img src={thumbnailUrl} alt="PDF Thumbnail" />
              </Link>
            ) : !isMobile && thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            {!isMobile && (
              <div className={`overlay${overlayVisible ? " visible" : ""}`}>
                {thumbnailUrl && (
                  <div className="buttons">
                    <Link id="viewLink" to="/viewCert" state={{ data: data }}>
                      <OverlayTrigger placement="top" overlay={viewTooltip}>
                        <button
                          id="viewButton"
                          className="view"
                          style={{
                            pointerEvents: overlayVisible ? "auto" : "none",
                          }}
                          onClick={handleViewClick}
                        >
                          <BiFileFind className="TeamD_icon view_icon" />
                        </button>
                      </OverlayTrigger>
                    </Link>
                    <OverlayTrigger placement="top" overlay={downloadTooltip}>
                      <button
                        className="download"
                        style={{
                          pointerEvents: overlayVisible ? "auto" : "none",
                        }}
                        onClick={handleDownloadClick}
                        disabled={!enableButtonClick || disableDownloadButton}
                      >
                        <MdOutlineFileDownload className="TeamD_icon download_icon" />
                      </button>
                    </OverlayTrigger>
                  </div>
                )}
              </div>
            )}
          </div>
          <p>Course Title</p>
        </div>
      </section>
      {showNotification && (
        <Alert
          variant={showNotification.type}
          onClose={() => setShowNotification(null)}
          dismissible
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          {showNotification.message}
        </Alert>
      )}
      <div
        className={`scroll-to-top${shouldShowScrollToTop ? " visible" : ""}`}
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: shouldShowScrollToTop ? "20px" : "-40px",
          right: "20px",
          cursor: "pointer",
          opacity: shouldShowScrollToTop ? 1 : 0,
          transition: "opacity 0.2s ease-in-out, bottom 0.2s ease-in-out",
          borderRadius: "100px",
          border: "1px solid #ccc",
          background: "#fff",
          padding: "15px",
        }}
      >
        <FaArrowUp />
      </div>
    </div>
  );
};

export default Team_D_Content;
