import React from "react";
import { categoryIdLabelMap } from "./CategoriesUtils";

export default function Settings(props) {
    const categorySelectRef = React.useRef();
    const questionsSelectRef = React.useRef();
    const timerSelectRef = React.useRef();
    function onCategoryUpdate() {
        props.updateSettings({
            ...props.settings, category: categorySelectRef.current.value
        });
    }

    function onQuestionCountUpdate() {
        props.updateSettings({
            ...props.settings, question_count: parseInt(questionsSelectRef.current.value)
        });
    }
    
    function onTimerUpdate() {
        props.updateSettings({
            ...props.settings, timer: parseInt(timerSelectRef.current.value)
        });
    }

    return <React.Fragment>
        <div className={"settings-container"}>
            <div className="settings-heading">
                <h2 className="gill-font">Settings</h2>
                <i className="material-symbols-rounded icon-menu" onClick={props.onSettingsCloseCallback}>close</i>
            </div>
            <label htmlFor="categories">Questions Category</label>
            <select className="settings-select" id="categories" name="categoriesList" aria-label="Questions Category" defaultValue={props.settings.category} onChange={onCategoryUpdate} ref={categorySelectRef}>
                {Object.keys(categoryIdLabelMap).map((id) => {
                   return <option id={id} value={id} key={id}>{categoryIdLabelMap[id]}</option>}
                )}
                
            </select>

            <label htmlFor="numOfquestions">Number of Questions</label>
            <select className="settings-select" defaultValue={props.settings.question_count} id="numOfquestions" name="numQuestionsList" ref={questionsSelectRef} onChange={onQuestionCountUpdate}>
                <option value={10}>10 questions</option>
                <option value={20}>20 questions</option>
                <option value={30}>30 questions</option>
            </select>

            <label htmlFor="timer" name="timer">Timer</label>
            <select className="settings-select" defaultValue={props.settings.timer} id="timer" onChange={onTimerUpdate} ref={timerSelectRef}>
                <option value={10}>10 seconds</option>
                <option value={20}>20 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
            </select>
        </div>

    </React.Fragment>
    
}