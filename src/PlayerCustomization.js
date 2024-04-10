import React from "react";
import imagesAndAlt from "./ImageUtils";

export default function PlayerCustomization(props) {
  const listOfImgs = imagesAndAlt();

  const inputRef = React.useRef();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState();

  function onPlayerNameInput() {
    props.updatePlayerName(inputRef.current.value);
  }

  function onAvatarSelect(index) {
    setSelectedImageIndex(index);
    props.updateAvatarIndex(index);
  }
  console.log(props.showAvatarError);
  return (
    <React.Fragment>
      <fieldset>
        <legend></legend>
        <label htmlFor="player_name">Player Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          id="player_name"
          name="player_name"
          ref={inputRef}
          onChange={onPlayerNameInput}
          required
        />
        <h2 className="label">Select an Avatar</h2>
        <div className="avatar-grid" id="avatar-grid">
          {/* Render all the avatars */}
          {listOfImgs.map((item, index) => {
            const selectClassName =
              selectedImageIndex === index ? "selected-avatar" : "";
            return (
              <div
                className={`avatar-circle ${selectClassName}`}
                key={"avatar" + index}
                onClick={() => onAvatarSelect(index)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAvatarSelect(index);
                  }
                }}
              >
                <img src={item[0]} alt={item[1]} />
              </div>
            );
          })}
        </div>
        {props.showAvatarError && (
          <p className="error">Please select an avatar!</p>
        )}
      </fieldset>
    </React.Fragment>
  );
}
