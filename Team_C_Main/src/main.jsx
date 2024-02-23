import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

//TEAM A PROVIDER
import { AuthProvider } from "./TeamAComponents/components/AuthContext.jsx";

//import dashboardprovider
import DashBoardProvider from "../src/TeamBComponents/components/context/DashBoardContext.jsx";

//import NavBarProvider
import NavBarProvider from "../src/TeamBComponents/components/context/NavBarContext.jsx";

//import ProfileProvider
import ProfileProvider from "../src/TeamBComponents/components/context/ProfileContext.jsx";

//import CourseProvider
import CourseProvider from "./TeamBComponents/components/context/CourseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <CourseProvider>
        <ProfileProvider>
          <NavBarProvider>
            <DashBoardProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </DashBoardProvider>
          </NavBarProvider>
        </ProfileProvider>
      </CourseProvider>
    </AuthProvider>
  </Router>
);
