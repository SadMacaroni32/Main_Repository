/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const DiscussionPosts = ({ discussionTitle, authorName }) => {
  const discussionId = `discussionTitle_${Date.now()}`;

  return (
    <div className="card row-hover pos-relative py-3 px-3 mb-3 border-top-0 border-right-0 border-bottom-0 rounded-0 discussion-container">
      <div className="row align-items-center">
        <div className="col-md-8 mb-3 mb-sm-0">
          <h5>
            <Link to="/forum_discussion" className="c_forum_decor text-success">
              Tsukiden Upcoming Events
            </Link>
          </h5>
          <p className="text-sm">
            <span className="op-6">Posted by</span>{" "}
            <a className="c_forum_decor text-black" href="#">
              Luigi
            </a>
          </p>
        </div>
        <div className="col-md-4 op-7 d-flex justify-content-end align-items-center">
          <div className="row text-center op-3">
            <div className="col px-5">
              <a
                className="c_forum_btnicn ion-ios-chatboxes-outline icon-1x"
                href="#"
              ></a>
              <span className="d-block text-sm">0 replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPosts;
