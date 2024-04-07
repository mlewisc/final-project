import React from "react";
import imagesAndAlt from "./ImageUtils";
import "material-symbols";

export default function GameSummary(props) {
  const listOfImgs = imagesAndAlt();

  return (
    <React.Fragment>
      <div className="popup-background">
        <div className="end-game-popup">
          <div className="leaderboard-section">
            <h1>Leaderboard</h1>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th></th>
                    <th>Player</th>
                    <th>Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  {props.leaderboardData.map((row, index) => {
                    const rank = index + 1;

                    console.log(props.currentDocId);
                    let rowClass =
                      props.currentDocId === row.id ? "active-row" : "";

                    if (rank % 2 === 0) {
                      rowClass = rowClass + " light";
                    }

                    return (
                      <tr key={row.id} className={rowClass}>
                        <td>{rank}</td>
                        <td>
                          <div className="little-circle">
                            <img
                              src={listOfImgs[row.avatar_index][0]}
                              alt={listOfImgs[listOfImgs[row.avatar_index][1]]}
                            />
                          </div>
                        </td>
                        <td>{row.player_name}</td>
                        <td>{row.total_points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="summary-section">
            <div className="player-info">
              <div className="player-circle">
                <img
                  src={listOfImgs[props.gameDetails.avatar_index][0]}
                  alt={listOfImgs[props.gameDetails.avatar_index][1]}
                />
              </div>
              <div className="player-info-details">
                <h2>{props.gameDetails.player_name}</h2>
                <div className="points">
                  <h3>245</h3>
                  <h4>total points</h4>
                </div>
              </div>
            </div>
            <div className="results-overview">
              <h5>Your Results Overview</h5>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="circle">3</div>
                  <span>Total Games</span>
                </div>
                <div className="summary-item">
                  <div className="circle green-circle">21</div>
                  <span>Total Correct</span>
                </div>
                <div className="summary-item">
                  <div className="circle red-circle">9</div>
                  <span>Total Incorrect</span>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => props.onEndGame(/* playAgain */ true)}>
                <i className="material-symbols-rounded">replay</i>Play again
              </button>
              <button
                onClick={() => props.onEndGame(/* playAgain */ false)}
                className="secondary"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
