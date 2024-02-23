import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const ChapterContext = createContext();

const ChapterProvider = ({children}) => {
  //react state for course api
  const [chapters, setChapters] = useState([]);

  //hide and show create new course
  const [ showChapter, setShowCreateChapter ] = useState(false);

  return (
    <ChapterContext.Provider
      value={{
        chapters,
        setChapters,
        showCreateChapter,
        setShowCreateChapter,
      }}>
      {children}
    </ChapterContext.Provider>
  );
}

export default ChapterProvider
