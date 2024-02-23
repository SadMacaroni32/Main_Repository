/* MODULES & COMPONENTS */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TeamC_Dashboard from '../src/TeamCComponents/pages/dashboard';
import TeamC_Course from '../src/TeamCComponents/pages/course';
import TeamC_Assessments from '../src/TeamCComponents/pages/assessment';

/* COURSE LISTS */
import TeamC_ChapterSvn from '../src/TeamCComponents/pages/chapter_svn';
import TeamC_ChapterSql from '../src/TeamCComponents/pages/chapter_sql';
import TeamC_ChapterHprog from '../src/TeamCComponents/pages/chapter_hprog';
/* CHAPTER 1 */
import TeamC_CourseSvn1 from '../src/TeamCComponents/pages/course/course1_svn';
import TeamC_CourseHprog1 from '../src/TeamCComponents/pages/course/course1_hprog';
import TeamC_CourseSql1 from '../src/TeamCComponents/pages/course/course1_sql';
/* CHAPTER 2 */
import TeamC_CourseSvn2 from '../src/TeamCComponents/pages/course/course2_svn';
import TeamC_CourseHprog2 from '../src/TeamCComponents/pages/course/course2_hprog';
import TeamC_CourseSql2 from '../src/TeamCComponents/pages/course/course2_sql';
/* CHAPTER 3 */
import TeamC_CourseSvn3 from '../src/TeamCComponents/pages/course/course3_svn';
import TeamC_CourseHprog3 from '../src/TeamCComponents/pages/course/course3_hprog';
import TeamC_CourseSql3 from '../src/TeamCComponents/pages/course/course3_sql';
/* OTHERS */
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function TeamC_Router() {
  
  return (
    <>
      <div className="navcontainer">
        <Routes>
          <Route path="/" element={<TeamC_Dashboard />} />
          <Route path="/assessment" element={<TeamC_Assessments />} />
          <Route path="/course" element={<TeamC_Course />} />

          {/* COURSE 1 */}
          <Route path="/course1_svn/*" element={<><TeamC_Sidebar /><TeamC_CourseSvn1 /></>}
          />
          <Route path="/course1_hprog/*" element={<><TeamC_Sidebar/><TeamC_CourseHprog1 /></>}
          />
          <Route path="/course1_sql/*" element={<><TeamC_Sidebar /><TeamC_CourseSql1 /></>}
          />
          {/* COURSE 2 */}
          <Route path="/course2_svn/*" element={<><TeamC_Sidebar /><TeamC_CourseSvn2 /></>}
          />
          <Route path="/course2_hprog/*" element={<><TeamC_Sidebar /><TeamC_CourseHprog2 /></>}
          />
          <Route path="/course2_sql/*" element={<><TeamC_Sidebar /><TeamC_CourseSql2 /></>}
          />
          {/* COURSE 3 */}
          <Route path="/course3_svn/*" element={<><TeamC_Sidebar /><TeamC_CourseSvn3 /></>}
          />
          <Route path="/course3_hprog/*" element={<><TeamC_Sidebar /><TeamC_CourseHprog3 /></>}
          />
          <Route path="/course3_sql/*" element={<><TeamC_Sidebar /><TeamC_CourseSql3 /></>}
          />

          {/* CHAPTER LIST */}
          <Route path="/chapters_svn/*" element={<TeamC_ChapterSvn />} />
          <Route path="/chapters_sql/*" element={<TeamC_ChapterSql />} />
          <Route path="/chapters_hprog/*" element={<TeamC_ChapterHprog />} />
        </Routes>
      </div>
    </>
  );
}

export default TeamC_Router;
