import React, { useEffect } from "react";

export default function Navigation(props) {
  const [visible, setVisibility] = React.useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const [menuIcon, setMenuIcon] = React.useState("menu");
  const [selectedPage, setSelectedPage] = React.useState("home");
  const [isDesktop, setIsDesktop] = React.useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    function handleResize() {
      const newIsDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop || newIsDesktop) {
        setVisibility(newIsDesktop);
        setMenuIcon("menu");
      }
      setIsDesktop(newIsDesktop);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop, setIsDesktop]);

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
    setVisibility(isDesktop);
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
            onClick={doMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                doMenu();
              }
            }}
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
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onMenuItemClick("home");
                  }
                }}
              >
                Home
              </li>
              <li
                className={
                  selectedPage === "how-it-works" ? "active" : undefined
                }
                onClick={() => onMenuItemClick("how-it-works")}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onMenuItemClick("how-it-works");
                  }
                }}
              >
                How it works
              </li>
              <li>
                <button
                  id="play-now-nav"
                  onClick={() => onMenuItemClick("start-trivia")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onMenuItemClick("start-trivia");
                    }
                  }}
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
