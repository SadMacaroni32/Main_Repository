import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import ChapterList from "../components/chapter_list";

function TeamC_ChapterSvn() {
  return (
    <>
      <Team_D_HeaderV2 />
      <ChapterList />
    </>
  )
}

export default TeamC_ChapterSvn;
