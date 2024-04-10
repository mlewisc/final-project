import React from "react";
import _ from "lodash";

export default function Question(props) {
  // Extract the information from the Question Data object
  const question = props.questionData.question;
  const correctAnswer = props.questionData.correctAnswer;
  const incorrectAnswers = props.questionData.incorrectAnswers;

  // Shuffle the array of answers so the correct answer is in different positions each time
  const allAnswers = React.useRef(
    _.shuffle(incorrectAnswers.concat(correctAnswer))
  );

  // Create an index for the answers
  const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState();

  const [disabled, setDisabled] = React.useState(false);

  function onAnswerSelect(index) {
    const isCorrect = allAnswers.current[index] === correctAnswer;
    setSelectedAnswerIndex(index);

    // Disable all the buttons
    setDisabled(true);

    // Call onQuestionComplete to start a new question
    props.onQuestionCompleteCallback(isCorrect);
  }

  function handleStyleChange(index) {
    // Check if the question was answered OR the timer ran out
    if (selectedAnswerIndex !== undefined || !props.isValidTime) {
      // Create a boolean if the selected answer is correct
      const isSelectedAnswerCorrect =
        allAnswers.current[selectedAnswerIndex] === correctAnswer;

      // If the selected answer is correct:
      if (isSelectedAnswerCorrect) {
        if (selectedAnswerIndex === index) {
          return "green";
        }
        // If the selected answer is incorrect:
      } else {
        // Check if the answer[index] is the one selected
        if (selectedAnswerIndex === index) {
          return "red";

          // Check if the answer at the current index is the correct answer
        } else if (allAnswers.current[index] === correctAnswer) {
          return "green";
        }
      }
      return "disabled";
    }
    return "";
  }

  return (
    <React.Fragment>
      <div id="main" className="question-answer-layout">
        <h1 className="question">{question}</h1>

        <div className="answers-list">
          {allAnswers.current.map((answer, index) => {
            let resultClass = handleStyleChange(index);

            return (
              <button
                disabled={disabled || !props.isValidTime}
                className={"answer " + resultClass}
                key={"answer" + index}
                onClick={() => onAnswerSelect(index)}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
