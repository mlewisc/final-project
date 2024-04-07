import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import StartTrivia from "./StartTrivia";
import Game from "./Game";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [showTriviaSettings, setShowTriviaSettings] = React.useState(false);
  const [isPlayAgainFlow, setIsPlayAgainFlow] = React.useState(false);

  const [gameInfo, setGameInfo] = React.useState({
    avatar_index: undefined,
    player_name: undefined,
    settings: {
      category: undefined,
      question_count: undefined,
      timer: undefined,
    },
  });
  const [questionsData, setQuestionsData] = React.useState();

  function onGameStart(gameInfo) {
    setGameInfo(gameInfo);
  }

  function onGameEnd(playAgain) {
    // Clear last questions data
    setQuestionsData();
    if (playAgain) {
      setShowTriviaSettings(true);
      setIsPlayAgainFlow(true);
      navigate("start-trivia");
    } else {
      setShowTriviaSettings(false);
      setGameInfo({
        avatar_index: undefined,
        player_name: undefined,
        settings: {
          category: undefined,
          question_count: undefined,
          timer: undefined,
        },
      });
      setIsPlayAgainFlow(false);
      navigate("home");
    }
  }

  function updateData(questionsData) {
    setQuestionsData(questionsData);
  }

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function navigateFromHome(page, showSettings, selectedCategory) {
    setGameInfo({
      player_name: gameInfo.player_name,
      avatar_index: gameInfo.avatar_index,
      settings: {
        category: selectedCategory,
        question_count: gameInfo.settings.question_count,
        timer: gameInfo.settings.timer,
      },
    });
    setShowTriviaSettings(showSettings);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function showNavigation() {
    if (
      currentPage === "home" ||
      currentPage === "how-it-works" ||
      currentPage === "start-trivia"
    ) {
      return <Navigation onNavigateCallback={navigate} />;
    }
  }

  return (
    <React.Fragment>
      <a href="#main" className="skip-to-main">
        <span className="skip">Skip to Content</span>
      </a>

      <header>{showNavigation()}</header>
      {currentPage === "home" && <Home onNavigateCallback={navigateFromHome} />}

      {currentPage === "how-it-works" && (
        <HowItWorks onNavigateCallback={navigate} />
      )}

      {currentPage === "start-trivia" && (
        <StartTrivia
          isPlayAgainFlow={isPlayAgainFlow}
          showSettings={showTriviaSettings}
          entryInfo={gameInfo}
          onNavigateCallback={navigate}
          onStartGameCallback={onGameStart}
          onFetchDataCallback={updateData}
        />
      )}

      {currentPage === "game" && (
        <Game
          gameDetails={gameInfo}
          onGameEnd={onGameEnd}
          questionData={questionsData}
        />
      )}
    </React.Fragment>
  );
}
