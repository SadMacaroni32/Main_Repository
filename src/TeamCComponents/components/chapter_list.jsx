import React, {useEffect, useState} from "react";
import { useLocation, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from "axios";
function ChapterList() {
    const [chapter, setChapter] = useState([]);

    useEffect(() => {
      const loadChapter = async () => {
        const result = await axios.get("http://localhost:8080/chapter");
        setChapter(result.data);
      }
      loadChapter();
    }, []);
    
    const { pathname } = useLocation();
    let courseTitle = '';
    let courseChapter = [];
    let courseUrl = [];
    
    switch (pathname) {
        case '/chapters_sql':
            courseTitle = 'SQL Programming';
            // Check if chapter data exists and has at least 3 chapters
            if (chapter && chapter.length >= 3) {
                courseChapter = [
                    chapter[0].chapterTitle,
                    chapter[1].chapterTitle,
                    chapter[2].chapterTitle,
                ];
            }
            courseUrl = [
                '/course1_sql',
                '/course2_sql',
                '/course3_sql',
            ];
            break;

        case '/chapters_svn':
            courseTitle = 'Version Control: Subversion';
            courseChapter = [
                'CHAPTER 1: TITLE OF THE CHAPTER', 
                'CHAPTER 2: TITLE OF THE CHAPTER', 
                'CHAPTER 3: TITLE OF THE CHAPTER', 
            ];
            courseUrl = [
                '/course1_svn',
                '/course2_svn',
                '/course3_svn',
            ];
            break;

        case '/chapters_hprog':
            courseTitle = 'HTML Programming';
            courseChapter = [
                'CHAPTER 1: TITLE OF THE CHAPTER', 
                'CHAPTER 2: TITLE OF THE CHAPTER', 
                'CHAPTER 3: TITLE OF THE CHAPTER', 
            ];
            courseUrl = [
                '/course1_hprog',
                '/course2_hprog',
                '/course3_hprog',
            ];
            break;

        default:
            courseTitle = '{courseTitle/chapter_list}';
            courseChapter = '{courseChapter/chapter_list}';
            courseUrl = '{courseUrl/chapter_list}';
            break;
    }

    return (
        <>

            {/* Back button */}
            <Link to='/course' className="buttonReturn d-flex align-items-center c_chapter_returncontainer" style={{ textDecoration: 'none', color: 'black', width: 'fit-content', }}>
                <div className="d-flex align-items-center" style={{ marginTop: '1rem' }}>
                    <div>
                        <img src="../../src/assets/TeamCassets/green_button.png" className="btnReturn c_chapter_return" alt="return-icon" style={{
                            transition: 'transform .1s', color: '#ffffff',
                            marginLeft: '1rem', width: '2rem', height: '2rem',
                        }} />
                    </div>
                    <span className="returnTitle c_chapter_returnText" style={{ marginLeft: '0.5rem', color: '#126912', fontSize: '1.5rem', marginTop: '0rem', }}>Back</span>
                </div>
            </Link>
            <div className="container mt-4 mx-auto">
                <h2 className="text-left mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>{courseTitle}</h2>
                <hr />

                {/* Chapter 1 */}
                <div className="d-flex align-items-center">
                    <div className="c_chapter_cardmain card flex-grow-1" style={{
                        willChange: 'filter',
                        transition: 'filter 300ms', marginTop: '10px', backgroundColor: '#126912', borderRadius: '1rem',
                    }}>
                        <Link to="/course1_sql" className="h4 text-white text-decoration-none c_chapter_cardtext">
                            <div className="card-body d-flex c_chapter_cardbody" style={{
                                backgroundColor: '#126912', borderRadius: '1rem',
                            }}>
                                {courseChapter[0]}
                            </div>
                        </Link>
                    </div>
                    <div className="small-box-container c_chapter_scoremain" style={{ marginTop: '0.6rem', marginLeft: '0.99rem', }}>
                        <div className="small-box c_chapter_scoresub d-flex align-items-center justify-content-center text-white" style={{
                            backgroundColor: '#126912', width: '4rem',
                            height: '4rem', borderRadius: '10px',
                        }}>
                            <span>-$-</span>
                        </div>
                    </div>
                </div>

                {/* Chapter 2 */}
                <div className="d-flex align-items-center">
                    <div className="c_chapter_cardmain card flex-grow-1" style={{
                        willChange: 'filter',
                        transition: 'filter 300ms', marginTop: '10px', backgroundColor: '#126912', borderRadius: '1rem',
                    }}>
                        <Link to="/course2_sql" className="h4 text-white text-decoration-none c_chapter_cardtext">
                            <div className="card-body d-flex c_chapter_cardbody" style={{
                                backgroundColor: '#126912', borderRadius: '1rem',
                            }}>
                                {courseChapter[1]}
                            </div>
                        </Link>
                    </div>
                    <div className="small-box-container c_chapter_scoremain" style={{ marginTop: '0.6rem', marginLeft: '0.99rem', }}>
                        <div className="small-box c_chapter_scoresub d-flex align-items-center justify-content-center text-white" style={{
                            backgroundColor: '#126912', width: '4rem',
                            height: '4rem', borderRadius: '10px',
                        }}>
                            <span>-$-</span>
                        </div>
                    </div>
                </div>

                {/* Chapter 3 */}
                <div className="d-flex align-items-center">
                    <div className="c_chapter_cardmain card flex-grow-1" style={{
                        willChange: 'filter',
                        transition: 'filter 300ms', marginTop: '10px', backgroundColor: '#126912', borderRadius: '1rem',
                    }}>
                        <Link to="/course3_sql" className="h4 text-white text-decoration-none c_chapter_cardtext">
                            <div className="card-body d-flex c_chapter_cardbody" style={{
                                backgroundColor: '#126912', borderRadius: '1rem',
                            }}>
                                {courseChapter[2]}
                            </div>
                        </Link>
                    </div>
                    <div className="small-box-container c_chapter_scoremain" style={{ marginTop: '0.6rem', marginLeft: '0.99rem', }}>
                        <div className="small-box c_chapter_scoresub d-flex align-items-center justify-content-center text-white" style={{
                            backgroundColor: '#126912', width: '4rem',
                            height: '4rem', borderRadius: '10px',
                        }}>
                            <span>-$-</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChapterList;