import React, { useState, useEffect } from "react";
import "../css/fdiscussion.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";

const ForumD = () => {
  // const [likeCount, setLikeCount] = useState(0);
  // const [dislikeCount, setDislikeCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0); //2.12.24
  const [dislikeCount, setDislikeCount] = useState(0); //2.12.24
  const [liked, setLiked] = useState(false); //2.12.24
  const [disliked, setDisliked] = useState(false); //2.12.24
  const [replying, setReplying] = useState(false); //2.8.24
  const [replyContent, setReplyContent] = useState(""); //2.8.24
  const [replies, setReplies] = useState([]); //2.8.24
  // State variables for managing dropdowns in reply containers 2.15.24
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [replyDropdownOpen, setReplyDropdownOpen] = useState({});
  //const [editing, setEditing] = useState(false);
  //const [editedContent, setEditedContent] = useState("");
  //const [textareaRows, setTextareaRows] = useState(3); // Adjust the number of rows based on content length

  // const handleReaction = (type) => {
  //   if (type === "like") {
  //     setLikeCount((prevLikeCount) => prevLikeCount + 1);
  //   } else if (type === "dislike") {
  //     setDislikeCount((prevDislikeCount) => prevDislikeCount + 1);
  //   }
  // };

  //try

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);

      // If the dislike button was previously clicked, reset its counter and remove the 'disliked' state
      if (disliked) {
        setDisliked(false);
        setDislikeCount(0);
      }
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(dislikeCount + 1);
      setDisliked(true);

      // If the like button was previously clicked, reset its counter and remove the 'liked' state
      if (liked) {
        setLiked(false);
        setLikeCount(0);
      }
    } else {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
    }
  };
  //try

  // Function to update the post time dynamically
  useEffect(() => {
    const updatePostTime = () => {
      var postTimeElement = document.getElementById("post-time");
      var currentDate = new Date();
      var formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      var formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      var updatedTime = formattedDate + " - " + formattedTime;
      postTimeElement.innerText = updatedTime;
    };

    // Call the function to update post time when the page loads
    updatePostTime();

    // Retrieve parameters from the URL
    //var urlParams = new URLSearchParams(window.location.search);
    //var title = urlParams.get('title');
    //var content = decodeURIComponent(urlParams.get('content'));

    // Set the discussion details on the webpage
    //document.getElementById("discussionTitle").innerText = title;
    //document.getElementById("discussionContent").innerText = content;
  }, []);

  const handleEditClick = () => {
    // Close the dropdown
    setDropdownOpen(false);
    // Get the post content
    var postContent = document.getElementById("discussionContent");

    // Create an editable textarea
    var textarea = document.createElement("textarea");
    textarea.className = "form-control";
    textarea.rows = "3";
    textarea.value = postContent.innerText;

    // Replace post content with the textarea
    postContent.replaceWith(textarea);

    // Add a "Save Changes" button
    var saveButton = document.createElement("button");
    saveButton.className = "btn btn-success mt-2";
    saveButton.innerText = "Save Changes";
    saveButton.onclick = function () {
      // Save the changes and replace the textarea with the new post content
      postContent.innerText = textarea.value;

      // Remove the "Save Changes" button
      saveButton.remove();

      // Replace the textarea with the updated post content
      textarea.replaceWith(postContent);
    };

    // Append the "Save Changes" button
    textarea.insertAdjacentElement("afterend", saveButton);
  }; //2.7.24

  const handleDeleteClick = () => {
    console.log("Delete clicked");
    // Get the post container
    var postContainer = document.querySelector(".TeamCForumC_Forumcard");

    // Create a confirmation prompt
    var confirmation = confirm("Do you want to delete this post?");

    // If the user confirms deletion, remove the post container
    if (confirmation) {
      postContainer.remove();
    }
  }; //2.7.24

  const handleDeleteClicktwo = (replyId) => {
    // Filter out the reply with the matching id
    const updatedReplies = replies.filter((reply) => reply.id !== replyId);
    // Update the state with the filtered replies
    setReplies(updatedReplies);
  };

  const handleReplyClick = () => {
    setReplying(!replying);
  };
  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  }; //2.8.24

  const handlePostReply = () => {
    if (replyContent.trim() !== "") {
      const newReply = {
        id: replies.length + 1,
        content: replyContent,
        time: new Date().toLocaleString(),
      };
      setReplies([...replies, newReply]);
      setReplyContent("");
      setReplying(false);
    }
  }; //2.8.24

  // Function to toggle dropdown in main post
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // Function to toggle dropdown in reply container
  const toggleReplyDropdown = (replyId) => {
    setReplyDropdownOpen((prevState) => ({
      ...prevState,
      [replyId]: !prevState[replyId],
    }));
  };

  useEffect(() => {
    // Set dropdowns to closed initially
    setDropdownOpen(false);
    setReplyDropdownOpen({});
  }, []);

  return (
    <>
      <Team_D_HeaderV2 />
      <div className="ForumDSpace">
        <Link
          to="/ForumF"
          id="TeamCReturnButtonFf"
          className="btn btn-secondary"
        >
          <FaArrowLeft />
        </Link>
        <div className="ForumC_ForumDcontainer">
          <div className="TeamCForumC_Forumcard">
            <div className="TeamCCardBody">
              <div className="TeamCFlex d-flex justify-content-between align-items-center mb-2">
                <div>
                  <h6 className="nameUSerfw-bold text-success mb-1">@Luigi</h6>
                  <p
                    id="post-time"
                    className="TeamC_ForumD text-muted small mb-0"
                  ></p>
                </div>
                <div className="TeamForum_Drop dropdown position-absolute top-0 end-0 three-dots">
                  <button
                    className="TeamC_forum_link link-muted"
                    onClick={toggleDropdown}
                    aria-expanded={dropdownOpen ? "true" : "false"}
                  >
                    <BsThreeDots className="TeamCdots bx bx-dots-horizontal-rounded" />
                  </button>
                  <ul
                    className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item"
                        onClick={handleEditClick}
                      >
                        Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item"
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <h2 id="discussionTitle" className="TeamC_discSec mt-3 mb-3 pb-2">
                Tsukiden Upcoming Events
              </h2>
              <p id="discussionContent" className="TeamC_ForumD mb-4 pb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quam velit, vulputate eu pharetra nec, mattis ac neque.
              </p>
              <div className="TeamCFlex d-flex justify-content-start">
                <div
                  onClick={handleLike}
                  className="TeamCFlex d-flex align-items-center me-3"
                >
                  <AiOutlineLike />
                  <div className="like-counter">{likeCount}</div>
                </div>
                <div
                  onClick={handleDislike}
                  className="TeamCFlex d-flex align-items-center me-3"
                >
                  <AiOutlineDislike />
                  <div className="dislike-counter">{dislikeCount}</div>
                </div>
                <a
                  href="#!"
                  className="TeamCFlex d-flex align-items-center me-3 reply-button"
                  onClick={handleReplyClick}
                >
                  <MdOutlineReply />
                  Reply
                </a>
              </div>
              {replying && (
                <div id="replyContainer" className="mt-3">
                  <textarea
                    id="replyTextArea"
                    className="TeamC_controlForm form-control"
                    rows="3"
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={handleReplyContentChange}
                  ></textarea>
                  <button
                    className="TeamCForumBtnPrime btn btn-primary mt-2"
                    onClick={handlePostReply}
                  >
                    Post
                  </button>
                </div>
              )}
              <div id="commentsSection" className="mt-3">
                {replies.map((reply) => (
                  <div key={reply.id} className="reply-container">
                    <div className="TeamC_inside">
                      <div className="TeamForum_Droptwo dropdown position-absolute top-0 end-0 three-dots">
                        <button
                          className="TeamC_forum_linktwo"
                          onClick={() => toggleReplyDropdown(reply.id)}
                          aria-expanded={
                            replyDropdownOpen[reply.id] ? "true" : "false"
                          }
                        >
                          <BsThreeDots className="TeamCdotstwo bx bx-dots-horizontal-rounded" />
                        </button>
                        <ul
                          className={`dropdown-menu${
                            replyDropdownOpen[reply.id] ? " show" : ""
                          }`}
                          aria-labelledby="dropdownMenuLink"
                        >
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              onClick={() => handleDeleteClicktwo(reply.id)}
                            >
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="TeamCFlex d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <h6 className="nameUSerfw-bold text-success mb-1">
                            @User
                          </h6>

                          <p className="TeamC_ForumD text-muted small mb-0">
                            {reply.time}
                          </p>
                        </div>
                      </div>
                      <p className="TeamC_ForumD mb-0 pb-1">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumD;
