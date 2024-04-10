import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import StartTrivia from "./StartTrivia";
import Game from "./Game";

export default function App(props) {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  const [currentPage, setCurrentPage] = React.useState("home");
  const [showTriviaSettings, setShowTriviaSettings] = React.useState(false);
  const [isPlayAgainFlow, setIsPlayAgainFlow] = React.useState(false);
  const [totals, setTotals] = React.useState({
    games_played: 0,
    score: 0,
    correct: 0,
    incorrect: 0,
  });

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

  function onGameEnd(
    playAgain,
    totals = {
      games_played: 0,
      score: 0,
      correct: 0,
      incorrect: 0,
    }
  ) {
    // Clear last questions data
    setQuestionsData();

    // Set the total score/game/correct/incorrect
    setTotals(totals);
    // How the settings version for who is playing again
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
      // Don't start the Play Again flow and nagivate to the Homepage
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
          isDesktop={isDesktop}
        />
      )}

      {currentPage === "game" && (
        <Game
          totals={totals}
          gameDetails={gameInfo}
          onGameEnd={onGameEnd}
          questionData={questionsData}
        />
      )}
    </React.Fragment>
  );
}
