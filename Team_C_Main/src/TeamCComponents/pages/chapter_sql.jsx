import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Team_D_HeaderV2 from "../../TeamDComponents/Team_D_HeaderV2";
import ChapterList from "../components/chapter_list";

// This function represents the component for displaying SQL query chapters.
function TeamC_ChapterSql() {
  return (
    <>
    {/*Navbar Component*/}
      <Team_D_HeaderV2 />
      <ChapterList />
    </>
  )
}


export default TeamC_ChapterSql;
