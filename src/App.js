import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import StartTrivia from "./StartTrivia";
import { categoryIds } from "./CategoriesUtils";
import Game from "./Game";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [homeNavigationInfo, setHomeNavInfo] = React.useState({
    show_settings: false,
    selected_category: categoryIds.general_knowledge,
  });

  const [gameInfo, setGameInfo] = React.useState({
    avatar_index: undefined,
    player_name: undefined,
    game_settings: {
      category: undefined,
      question_count: undefined,
      timer: undefined,
    },
  });
  const [questionsData, setQuestionsData] = React.useState();

  function onGameStart(gameInfo) {
    setGameInfo(gameInfo);
  }

  // function onGameEnd()

  function updateData(questionsData) {
    setQuestionsData(questionsData);
  }

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function navigateFromHome(page, navigationInfo) {
    setHomeNavInfo(navigationInfo);
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
          entryInfo={homeNavigationInfo}
          onNavigateCallback={navigate}
          onStartGameCallback={onGameStart}
          onFetchDataCallback={updateData}
        />
      )}

      {currentPage === "game" && (
        <Game
          gameDetails={gameInfo}
          exit={navigate}
          questionData={questionsData}
        />
      )}
      {/* onGameEnd={onGameEnd} */}
    </React.Fragment>
  );
}
