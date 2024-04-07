import React from "react";
import PlayerCustomization from "./PlayerCustomization";
import Settings from "./Settings";
import Loading from "./Loading";
import { categoryIds } from "./CategoriesUtils";

export default function StartTrivia(props) {
  const [settingsVisible, setSettingsVisibility] = React.useState(
    props.showSettings
  );
  const [settings, setSettings] = React.useState({
    category: props.entryInfo.settings.category
      ? props.entryInfo.settings.category
      : categoryIds.general_knowledge,
    question_count: props.entryInfo.settings.question_count
      ? props.entryInfo.settings.question_count
      : 10,
    timer: props.entryInfo.settings.timer ? props.entryInfo.settings.timer : 10,
  });
  const [playerName, setPlayerName] = React.useState(
    props.entryInfo.player_name
  );
  const [avatarIndex, setAvatarIndex] = React.useState(
    props.entryInfo.avatar_index
  );
  const [showAvatarError, setAvatarError] = React.useState(false);
  const [disable, setDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  function updateSettings(newSettings) {
    setSettings(newSettings);
  }

  function updatePlayerName(playerName) {
    setPlayerName(playerName);

    if (avatarIndex !== undefined) {
      setDisabled(false);
    }
  }

  function updateAvatarIndex(avatarIndex) {
    setAvatarIndex(avatarIndex);
    setAvatarError(false);
    if (playerName !== undefined) {
      setDisabled(false);
    }
  }

  function onStartGame(e) {
    e.preventDefault();
    if (avatarIndex === undefined) {
      setAvatarError(true);
    }

    if (avatarIndex !== undefined && playerName !== undefined) {
      setIsLoading(true);

      let gameDetails = {
        avatar_index: avatarIndex,
        player_name: playerName,
        settings: settings,
      };
      // Update the game information
      props.onStartGameCallback(gameDetails);

      // Fetch the data from the API
      fetch(
        `https://the-trivia-api.com/api/questions?limit=${gameDetails.settings.question_count}&categories=${gameDetails.settings.category}`
      )
        .then((response) => response.json())
        .then((questionData) => {
          props.onFetchDataCallback(questionData);

          setIsLoading(false);
          // Navigate to the Game's page
          props.onNavigateCallback("game");
        });
    }
  }

  console.log(settings);
  console.log(playerName);
  console.log(avatarIndex);

  function handleSettingsPopup() {
    setSettingsVisibility(!settingsVisible);
  }

  return (
    <React.Fragment>
      <main style={{ marginBottom: "0" }}>
        <div className="hero-banner banner-content-centered">
          <div className="banner-content-centered">
            <h1>Time to play!</h1>
            <p>
              Before we start, check the game settings to personalize your
              Trivia.
            </p>
            <div id="main">
              <button id="settings" onClick={handleSettingsPopup}>
                <i
                  className="material-symbols-rounded"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  settings
                </i>
                Settings
              </button>
            </div>

            {settingsVisible && (
              <Settings
                onStartGame={onStartGame}
                isPlayAgainFlow={props.isPlayAgainFlow}
                settings={settings}
                onSettingsCloseCallback={handleSettingsPopup}
                updateSettings={updateSettings}
              />
            )}
          </div>

          {/* <!-- Enter Player Info Card --> */}
          <form id="player-customization">
            <PlayerCustomization
              updatePlayerName={updatePlayerName}
              updateAvatarIndex={updateAvatarIndex}
              showAvatarError={showAvatarError}
            />
            <button
              className="start-game"
              onClick={onStartGame}
              disabled={disable}
            >
              Start game
            </button>
          </form>
        </div>
        {isLoading && <Loading />}
      </main>
    </React.Fragment>
  );
}
