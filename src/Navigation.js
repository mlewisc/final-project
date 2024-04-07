import React from "react";

export default function Navigation(props) {
  const [visible, setVisibility] = React.useState(false);
  const [menuIcon, setMenuIcon] = React.useState("menu");
  const [selectedPage, setSelectedPage] = React.useState("home");

  function doMenu() {
    if (menuIcon === "menu") {
      setMenuIcon("close");
      setVisibility(true);
    } else {
      setMenuIcon("menu");
      setVisibility(false);
    }
  }

  function onMenuItemClick(page) {
    setSelectedPage(page);
    props.onNavigateCallback(page);
    setVisibility(false);
    setMenuIcon("menu");
  }

  // Return the navigation
  return (
    <nav>
      <ul>
        <li>
          <a href="index.html" className="logo">
            Quizine<strong>Trivia</strong>
          </a>
        </li>
        <li>
          <i
            tabIndex={0}
            className="material-symbols-rounded icon-menu"
            style={{ fontSize: "3rem" }}
            onClick={doMenu}
          >
            {menuIcon}
          </i>
        </li>
        {visible && (
          <div id="mobile-menu">
            <ul>
              <li
                className={selectedPage === "home" ? "active" : undefined}
                onClick={() => onMenuItemClick("home")}
              >
                Home
              </li>
              <li
                className={
                  selectedPage === "how-it-works" ? "active" : undefined
                }
                onClick={() => onMenuItemClick("how-it-works")}
              >
                How it works
              </li>
              <li>
                <button
                  id="play-now-nav"
                  onClick={() => onMenuItemClick("start-trivia")}
                >
                  <i className="material-symbols-rounded">play_circle</i>Play
                  now
                </button>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
}
