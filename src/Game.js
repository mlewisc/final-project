import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Question from "./Question";
import "material-symbols";
import db from "./firebase";
import GameSummary from "./GameSummary";

export default function Game(props) {
  const ref = db.collection("quizine-leaderboard");

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isValidTime, setIsValidTime] = React.useState(true);
  const [totalAnswered, setTotalAnswered] = React.useState(0);
  const [userScore, setUserScore] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [showTimesUp, setShowTimesUp] = React.useState(false);
  const [roundOver, setRoundOver] = React.useState(false);
  const [leaderboardData, setLeaderboardData] = React.useState([]);
  const [docId, setDocId] = React.useState();

  // Timer Countdown
  const children = ({ remainingTime }) => {
    // Return the message "Time's up" when the timer reaches 0
    if (remainingTime === 0) {
      return (
        <div className="timer-end" role="timer" aria-live="assertive">
          Time's up!
        </div>
      );
    }
    // Return the remaining seconds
    return (
      <div className="countdown" role="timer" aria-live="assertive">
        {remainingTime}
      </div>
    );
  };

  function onQuestionComplete(questionCorrect) {
    // Pause the timer after user selects an answer
    setIsPlaying(false);
    // Increment the number of answered questions
    setTotalAnswered(totalAnswered + 1);
    // Increment score  if the question was answered correctly
    if (questionCorrect) {
      setUserScore(userScore + 1);
    }
    // Hide the Time's up message after half a second
    setTimeout(() => {
      setShowTimesUp(false);
    }, 1000);

    // Go to the next question and reset the timer after 3 seconds
    setTimeout(() => {
      if (questionIndex === props.questionData.length - 1) {
        onEndOfGame();
      } else {
        setQuestionIndex(questionIndex + 1);
        setIsPlaying(true);
        setIsValidTime(true);
      }
    }, 3000);
  }

  function onEndOfGame() {
    // Update the local game values
    // Check if I have a document id from Firebase
    // If I have, then I update the value at that id in the firabse using doc.(id).update{ write values being updated}

    // If I DON'T hava a doc id, then write the local values to the database
    // Store the data from this round in the Firebase database
    db.collection("quizine-leaderboard")
      .add({
        player_name: props.gameDetails.player_name,
        avatar_index: props.gameDetails.avatar_index,
        games_played: 1,
        correct_answers: userScore,
        wrong_answers: totalAnswered - userScore,
        total_points: userScore,
      })
      .then((response) => setDocId(response.id));

    // Update roundOver state so leaderboard can appear in the DOM
    setRoundOver(true);
    // Fetch the data for the leaderboard from the database
    fetchLeaderboardData();
  }

  async function fetchLeaderboardData() {
    // Query the 10 results with the highest scores
    const response = await ref.orderBy("total_points", "desc").limit(10).get();

    const data = await response.docs.map((doc) => {
      // Create a object with the information needed for each row of the leaderboard
      const rowData = {
        id: doc.id,
        avatar_index: doc.data().avatar_index,
        player_name: doc.data().player_name,
        total_points: doc.data().total_points,
      };
      return rowData;
    });
    // Update leaderboardData to store the fetched data
    setLeaderboardData(data);
  }

  // Take the user back to the home page when the EXIT button is clicked
  function onEndGame(playAgain) {
    props.onGameEnd(playAgain);
  }

  return (
    <React.Fragment>
      <main className="background">
        <div className="game-heading">
          <div className="timer-container">
            <p className="timer-text">Seconds left:</p>
            <div className="glow">
              <CountdownCircleTimer
                className="glow"
                isPlaying={isPlaying}
                duration={props.gameDetails.settings.timer}
                colors={["#00FCFF", "#00FCFF", "#00FCFF", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={() => {
                  // Show correct answers since the time is up
                  setIsValidTime(false);
                  // Show the time's up message
                  setShowTimesUp(true);
                  // Update the game
                  onQuestionComplete(false);
                }}
                strokeWidth={5}
                children={children}
                size={80}
                key={"timer-" + questionIndex}
              ></CountdownCircleTimer>
            </div>
          </div>
          <button
            className="exit"
            onClick={() => onEndGame(/* playAgain */ false)}
          >
            Exit Game
          </button>
        </div>
        <div className="game-display">
          <div className="score">
            <p>
              Your Score: {userScore} of {totalAnswered}
            </p>
          </div>

          {props.questionData !== undefined &&
            props.questionData.map((question, index) => {
              if (questionIndex === index) {
                return (
                  <Question
                    key={"question" + index}
                    isValidTime={isValidTime}
                    questionData={question}
                    onQuestionCompleteCallback={onQuestionComplete}
                  />
                );
              }
              return undefined;
            })}
          {showTimesUp && (
            <div className="popup-background">
              <div className="timer-message">
                <i
                  className="material-symbols-rounded"
                  style={{ fontSize: "2.5rem", fontWeight: "700" }}
                >
                  alarm_off
                </i>
                <span>Timeout!</span>
              </div>
            </div>
          )}
          {roundOver && (
            <GameSummary
              onEndGame={onEndGame}
              gameDetails={props.gameDetails}
              leaderboardData={leaderboardData}
              currentDocId={docId}
            />
          )}
        </div>
      </main>
    </React.Fragment>
  );
}
