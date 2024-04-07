import React from "react";
import Footer from "./Footer";
import category from "./images/category.svg";
import questions from "./images/questions.svg";
import stopwatch from "./images/time.svg";
import avatar from "./images/avatar.svg";
import podium from "./images/podium.svg";

export default function HowItWorks() {


    return <React.Fragment>

    <main>
      {/* <!-- Hero Banner Section --> */}
      <div className="hero-banner">
        <h1 className="center-font">This is how <span className="gill-font">Quizine<strong>Trivia</strong></span> works</h1>
      </div>

      <div id="main">
        <h2>Get started with 4 easy steps</h2>
        {/* <!-- STEPS Section --> */}
        <div className="steps-container">
            {/* <!-- 1st Step --> */}
            <div className="step-box">
                <img src={category} alt="illustration with 3 floating cards and a pointing hand hovering over an unselected card"/>
                <div className="step-details">
                    <h3>Pick a category</h3>
                    <p>You can decide between 10 different categories for your trivia questions. If you don’t have any preference, just select the “Mixed General Knowledge” option to have questions from various topics.</p>
                </div>
            </div>
            {/* <!-- 2nd Step --> */}
            <div className="step-box">
                <img src={questions} alt="illustration with 1question bubble and a ... bubble"/>
                <div className="step-details">
                    <h3>Pick the number of questions</h3>
                    <p>Decide how many questions you want to answer per round you play.</p>
                </div>
            </div>
            {/* <!-- 3rd Step --> */}
            <div className="step-box">
                <img src={stopwatch} alt="illustration of a stopwatch"/>
                <div className="step-details">
                    <h3>Decide your answering time</h3>
                    <p>Select how many seconds you need to answer each question. The faster you answer you questions, the more points you get for each correct answer.</p>
                </div>
            </div>
            {/* <!-- 4th Step --> */}
            <div className="step-box">
                <img src={avatar} alt="illustration a faceless avatar"/>
                <div className="step-details">
                    <h3>Personalize!</h3>
                    <p>Enter your player name and select a special food as your avatar, and get ready to play!</p>
                </div>
            </div>
        </div>
      </div>
      {/* <!-- More Details Section --> */}
      <div className="purple-section no-padding">
        <h2>Test your knowledge, round after round!</h2>
        <div className="flex-box">
            <p>Each round brings you closer to trivia mastery. <strong>Want to keep the challenge going?</strong> Choose "Play Again" to add your score to the total and climb the leaderboard. At the end of your quizine tour, see how you stack up against other trivia master chefs!</p>
            <img src={podium} alt="illustration of three podiums with 1st, 2nd, and 3rd places and a star on each" width="60%"/>
        </div>
      </div>
    </main>

    <Footer />
        
    </React.Fragment>
}