/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";

// TEAM A IMPORTS
import Landing from "../src/TeamAComponents/components/Landing";
import Login from "../src/TeamAComponents/components/Login";
import Register from "../src/TeamAComponents/components/Register";
import Forgot from "../src/TeamAComponents/components/Forgot";
import Dashboard from "../src/TeamAComponents/components/Dashboard";
import Profile from "../src/TeamAComponents/components/Profile";
import { Route, Routes } from "react-router-dom";
import Navigation from "../src/TeamAComponents/components/Navigation";
import ProfileEdit from "../src/TeamAComponents/components/ProfileEdit";
import Verification from "../src/TeamAComponents/components/Verification";
import ChangePassword from "../src/TeamAComponents/components/ChangePassword";
import About from "../src/TeamAComponents/components/About";
import Footer from "./TeamAComponents/components/Footer";
import Email from "./TeamAComponents/components/Email";


// TEAM B IMPORTS

//2/4/2024 junite, routes integration, added code splitting for app optimization

import TeamB_Fallbackloading from "./TeamBComponents/components/FallbackLoading";
const TeamB_Profile = lazy(() => import("./TeamBComponents/components/Profile/Profile"));
const TeamB_Dashboard = lazy(() => import("./TeamBComponents/components/DashBoard/Dashboard"));
const TeamB_CourseList = lazy(() => import("./TeamBComponents/components/CourseList & AddCourseList/CourseList"));
const TeamB_AddNewCourse = lazy(() => import("./TeamBComponents/components/CourseList & AddCourseList/AddNewCourse"));
const TeamB_CourseOverview = lazy(() => import("./TeamBComponents/components/CourseList & AddCourseList/CourseOverview"));
const TeamB_EditChapterTitle = lazy(() => import("./TeamBComponents/components/CourseList & AddCourseList/EditChapterTitle"));
const TeamB_CreateNewChapterTitle = lazy(() => import("./TeamBComponents/components/CourseList & AddCourseList/CreateNewChapterTitle"));
const TeamB_CreateNewCourseCopy = lazy(() => import("./TeamBComponents/components/CourseList & AddCourseList/CreateCourse/CreateNewCourse"));
const TeamB_TopicPage = lazy(() => import("./TeamBComponents/components/Topic/TopicPages/TopicPage"));


// TEAM C IMPORT

import TeamC_Dashboard from "./TeamCComponents/pages/dashboard";
import TeamC_Assessments from "./TeamCComponents/pages/assessment";
import TeamC_Course from "./TeamCComponents/pages/course";
import TeamC_CourseSql1 from "./TeamCComponents/pages/course/course1_sql";
import TeamC_CourseSvn1 from "./TeamCComponents/pages/course/course1_svn";
import TeamC_CourseHprog1 from "./TeamCComponents/pages/course/course1_hprog";
import TeamC_CourseSvn2 from "./TeamCComponents/pages/course/course2_svn";
import TeamC_CourseHprog2 from "./TeamCComponents/pages/course/course2_hprog";
import TeamC_CourseSql2 from "./TeamCComponents/pages/course/course2_sql";
import TeamC_CourseSql3 from "./TeamCComponents/pages/course/course3_sql";
import TeamC_CourseSvn3 from "./TeamCComponents/pages/course/course3_svn";
import TeamC_CourseHprog3 from "./TeamCComponents/pages/course/course3_hprog";
import TeamC_ChapterSql from "./TeamCComponents/pages/chapter_sql";
import TeamC_ChapterSvn from "./TeamCComponents/pages/chapter_svn";
import TeamC_ChapterHprog from "./TeamCComponents/pages/chapter_hprog";
import TeamC_QuizForm from "./TeamCComponents/pages/quizForm";
import TeamA_NewPass from "./TeamAComponents/components/NewPass";
import TeamC_QuizHtml1 from "./TeamCComponents/pages/quiz/quiz_html1";
import TeamC_QuizSql1 from "./TeamCComponents/pages/quiz/quiz_sql1";
import TeamC_QuizSvn1 from "./TeamCComponents/pages/quiz/quiz_svn1";
import TeamC_QuizSql2 from "./TeamCComponents/pages/quiz/quiz_sql2";
import TeamC_QuizSvn2 from "./TeamCComponents/pages/quiz/quiz_svn2";
import TeamC_QuizHtml2 from "./TeamCComponents/pages/quiz/quiz_html2";
import TeamC_QuizSql3 from "./TeamCComponents/pages/quiz/quiz_sql3";
import TeamC_QuizSvn3 from "./TeamCComponents/pages/quiz/quiz_svn3";
import TeamC_QuizHtml3 from "./TeamCComponents/pages/quiz/quiz_html3";
import ForumF from "./TeamCComponents/pages/ForumF";
import ForumD from "./TeamCComponents/pages/ForumD";
import AssessmentSql from "./TeamCComponents/pages/quiz/assessment_sql";
import AssessmentSvn from "./TeamCComponents/pages/quiz/assessment_svn";
import AssessmentHtml from "./TeamCComponents/pages/quiz/assessment_html";


// team D
import Team_D_View from "./TeamDComponents/Team_D_View";
import Team_D_Verification from "./TeamDComponents/Team_D_Verification";
import Team_D_Verif_nonuser from "./TeamDComponents/Team_D_Verif_nonuser";
import Team_D_Content from "./TeamDComponents/Team_D_Content";


function TeamIntegrationRoutes() {
  return (
    <>
      <Suspense fallback={<TeamB_Fallbackloading />}>
        <Routes>
          {/* TEAM A */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<ProfileEdit />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/email" element={<Email />} />
          <Route path="new" element={<TeamA_NewPass />} />

          {/* TEAM B */}
          <Route path="/teambdashboard" element={<TeamB_Dashboard />} />
          <Route path="/teambprofile" element={<TeamB_Profile />} />
          <Route path="/teambcourselist" element={<TeamB_CourseList />} />
          <Route path="/teambaddnewcourse" element={<TeamB_AddNewCourse />} />
          <Route
            path="/teambcourseoverview/:id"
            element={<TeamB_CourseOverview />}
          />
          <Route
            path="/teambeditchaptertitle/:id"
            element={<TeamB_EditChapterTitle />}
          />
          <Route
            path="/teambcreatenewchaptertitle"
            element={<TeamB_CreateNewChapterTitle />}
          />
          <Route path="/teambtopicpage" element={<TeamB_TopicPage />} />
          <Route
            path="teambcreatenewcoursecopy"
            element={<TeamB_CreateNewCourseCopy />}
          />

        {/* TEAM C */}
        <Route path="/teamcdashboard" element={<TeamC_Dashboard />} />
        <Route path="/assessment" element={<TeamC_Assessments />} />
        <Route path="/course" element={<TeamC_Course />} />
        <Route path="/ForumF" element={<ForumF />} />
        <Route path="/quizform" element={<TeamC_QuizForm/>} />
        <Route path="/forum_discussion" element={<ForumD/>} />
        <Route path="/assessment_sql" element={<AssessmentSql />} />
        <Route path="/assessment_svn" element={<AssessmentSvn />} />
        <Route path="/assessment_html" element={<AssessmentHtml />} />

          {/* COURSE 1 */}
          <Route
            path="/course1_svn/*"
            element={
              <>
                <TeamC_CourseSvn1 />
              </>
            }
          />
          <Route
            path="/course1_hprog/*"
            element={
              <>
                <TeamC_CourseHprog1 />
              </>
            }
          />
          <Route
            path="/course1_sql/*"
            element={
              <>
                <TeamC_CourseSql1 />
              </>
            }
          />
          {/* COURSE 2 */}
          <Route
            path="/course2_svn/*"
            element={
              <>
                <TeamC_CourseSvn2 />
              </>
            }
          />
          <Route
            path="/course2_hprog/*"
            element={
              <>
                <TeamC_CourseHprog2 />
              </>
            }
          />
          <Route
            path="/course2_sql/*"
            element={
              <>
                <TeamC_CourseSql2 />
              </>
            }
          />
          {/* COURSE 3 */}
          <Route
            path="/course3_svn/*"
            element={
              <>
                <TeamC_CourseSvn3 />
              </>
            }
          />
          <Route
            path="/course3_hprog/*"
            element={
              <>
                <TeamC_CourseHprog3 />
              </>
            }
          />
          <Route
            path="/course3_sql/*"
            element={
              <>
                <TeamC_CourseSql3 />
              </>
            }
          />
          {/* CHAPTER LIST */}
          <Route path="/chapters_svn/*" element={<TeamC_ChapterSvn />} />
          <Route path="/chapters_sql/*" element={<TeamC_ChapterSql />} />
          <Route path="/chapters_hprog/*" element={<TeamC_ChapterHprog />} />

          {/* QUIZ LIST */}
          <Route path="/quiz_sql1" element={<TeamC_QuizSql1 />} />
          <Route path="/quiz_svn1" element={<TeamC_QuizSvn1 />} />
          <Route path="/quiz_html1" element={<TeamC_QuizHtml1 />} />
          <Route path="/quiz_sql2" element={<TeamC_QuizSql2 />} />
          <Route path="/quiz_svn2" element={<TeamC_QuizSvn2 />} />
          <Route path="/quiz_html2" element={<TeamC_QuizHtml2 />} />
          <Route path="/quiz_sql3" element={<TeamC_QuizSql3 />} />
          <Route path="/quiz_svn3" element={<TeamC_QuizSvn3 />} />
          <Route path="/quiz_html3" element={<TeamC_QuizHtml3 />} />

          {/* Team D */}

          <Route path="/certificate" element={<Team_D_Content />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/viewCert" element={<Team_D_View />} />
          <Route path="/verification" element={<Team_D_Verification />} />
          <Route path="/verif_nonuser" element={<Team_D_Verif_nonuser />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1 style={{color: "red", textAlign: "center", marginTop: "20%", fontSize: "5rem"}}>404 - Page Not Found</h1>} />
  
        </Routes>
      </Suspense>
    </>
  );
}

export default TeamIntegrationRoutes;
