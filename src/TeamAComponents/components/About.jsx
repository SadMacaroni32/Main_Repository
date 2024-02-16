/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import React from "react";
import "../styles/Auth.css";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import card1 from "../../assets/card 1.svg";
import card2 from "../../assets/card 2.svg";
const About = () => {
  return (
    <>
      <nav className="my-navigation">
        <Link to="/">
          <img src="..\src\assets\TeamAassets\companyLogo.png" alt="Logo" />
        </Link>
        <ul className="menu-hide">
          <li>
            <a href="/verif_nonuser">Verification</a>
          </li>
          <li>
            <a href="About">About us</a>
          </li>
          <li>
            <a href="https://www.tsukiden.com.ph">Contact us</a>
          </li>
        </ul>
        <div className="testing">
          <Link to="/register">
            <button id="register">Register</button>
          </Link>
          <Link to="/login">
            <button id="login">Log In</button>
          </Link>
        </div>
      </nav>
      {/* Main Content Section */}
      {/* className="home-content" old css */}   
      <div className="flex flex-col TeamB_text-shadow">
        <div className="flex flex-col pr-[6rem] pl-[6rem] pt-[2rem] pb-[2rem] p leading-6">
            {/* className="about-container" old css */}
            <h1 className="mt-[15px] text-center font-bold text-[2rem]">
              About Tsukiden{" "}
            </h1>
            <p className=" text-center">
              Tsukiden Global Solutions, Inc.<i>YOUR RELIABLE IT PARTNER </i>
              That's who <i>WE</i> are. For more than 30 years now, Team
              Tsukiden has always been the trusted reliable IT partner of its
              clients for various projects in Japan, Philippines, Malaysia, Hong
              Kong, Singapore, Taiwan, United Kingdom, and the United States of
              America. Pioneer in IT Outsourcing Tsukiden Global Solutions Inc.
              is one of the pioneers in IT Outsourcing for the Japanese market
              here in the Philippines. Since 1989, even before the word
              “outsourcing” was coined, WE have been sending engineers to Japan
              for software development. With our years of experience and still
              growing, there is no other more stable company to outsource to
              than Tsukiden Global Solutions Inc. Tsukiden Global Solutions Inc.
              provides its clients the advantage of having hardworking,
              committed and talented manpower on demand, where and when they are
              needed at a cost that fits the development budget.
            </p>
            {/* Include the PhotoSection component here */}
        </div>
        {/* className="about-mv" old css classname*/}
        <div className=" flex flex-row leading-6">
            <div className="border w-[50%] text-center pl-[6rem] pr-[1rem]">
              <h1 className=" font-bold text-[2rem] ">Mission</h1>
              We aim to... provide excellent quality service to our{" "}
              <i>CLIENTS </i>, foster professional growth and care to our{" "}
              <i>EMPLOYEES</i> & develop innovative solutions dedicated for the
              welfare of our <i>COMMUNITY & SOCIETY.</i>
              <div className="pt-[1.5rem]">
              <img src={card1} alt="" width={500}/>
              </div>
            </div>
            <div className="border w-[50%] pr-[6rem] pl-[1rem]">
            <div className="pb-[1.5rem] ">
            <img src={card2} alt="" width={500}/>
            </div>
              <h1 className="text-center font-bold text-[2rem] ">Vision</h1>
              <div className="text-center">
                <i>TGSI</i> is committed to be{" "}
                <i>THE PREMIER GLOBAL I.T. BUSINESS PARTNER </i>
                driven by passion for innovation
              </div>
            </div>
        </div>
      </div>
      <div>
        <footer className="flex justify-center p-5  bottom-0 w-full ">
          <div>
            <p className="text-[#4D9349] font-medium">
              All Rights Reserved | Copyright 2024
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
