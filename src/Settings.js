import React from "react";
import { categoryIdLabelMap } from "./CategoriesUtils";

export default function Settings(props) {
  const categorySelectRef = React.useRef(props.settings.category);
  const questionsSelectRef = React.useRef(props.settings.question_count);
  const timerSelectRef = React.useRef(props.settings.timer);
  function onCategoryUpdate() {
    props.updateSettings({
      ...props.settings,
      category: categorySelectRef.current.value,
    });
  }

  function onQuestionCountUpdate() {
    props.updateSettings({
      ...props.settings,
      question_count: parseInt(questionsSelectRef.current.value),
    });
  }

  function onTimerUpdate() {
    props.updateSettings({
      ...props.settings,
      timer: parseInt(timerSelectRef.current.value),
    });
  }

  function onCloseSettings() {
    props.onSettingsCloseCallback();
  }

  return (
    <React.Fragment>
      <div
        className={
          props.isPlayAgainFlow && props.isDesktop
            ? "settings-container full-width"
            : "settings-container"
        }
      >
        <div className="settings-heading">
          <h2 className="gill-font">Settings</h2>
          {!props.isPlayAgainFlow && (
            <i
              className="material-symbols-rounded icon-menu"
              onClick={onCloseSettings}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCloseSettings();
                }
              }}
            >
              close
            </i>
          )}
        </div>
        <label htmlFor="categories">Questions Category</label>
        <select
          className="settings-select"
          id="categories"
          name="categoriesList"
          aria-label="Questions Category"
          defaultValue={props.settings.category}
          onChange={onCategoryUpdate}
          ref={categorySelectRef}
          tabIndex={0}
        >
          {Object.keys(categoryIdLabelMap).map((id) => {
            return (
              <option id={id} value={id} key={id}>
                {categoryIdLabelMap[id]}
              </option>
            );
          })}
        </select>

        <label htmlFor="numOfquestions">Number of Questions</label>
        <select
          className="settings-select"
          defaultValue={props.settings.question_count}
          id="numOfquestions"
          name="numQuestionsList"
          ref={questionsSelectRef}
          onChange={onQuestionCountUpdate}
        >
          <option value={10}>10 questions</option>
          <option value={20}>20 questions</option>
          <option value={30}>30 questions</option>
        </select>

        <label htmlFor="timer" name="timer">
          Timer
        </label>
        <select
          className="settings-select"
          defaultValue={props.settings.timer}
          id="timer"
          onChange={onTimerUpdate}
          ref={timerSelectRef}
        >
          <option value={10}>10 seconds</option>
          <option value={20}>20 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
        </select>
        {props.isPlayAgainFlow && (
          <button className="start-game" onClick={props.onStartGame}>
            Start game
          </button>
        )}
      </div>
    </React.Fragment>
  );
}
