import React from 'react';
import './css/style.css';
import 'material-symbols';
import  servingPlatter from './images/serving-platter.svg';
import Footer from './Footer';
import { categoryInfo } from './CategoriesUtils';

export default function Home(props) {
  return ( 
    <React.Fragment>
          <main>
            {/* <!-- Hero Banner Section --> */}
            <div className="hero-banner">
              <img
                src={servingPlatter}
                alt="an illustration of a grey serving platter lid opened with a hand" width="95%"
              />
              <h1>Serving up your <strong className="gill-font">trivia</strong> on a platter</h1>
              <button id="play-now" onClick={() => props.onNavigateCallback('start-trivia', {show_settings: false})}><i className="material-symbols-rounded">play_circle</i>Play now</button>
            </div>

            <div id="main">
              {/* <!-- First Content Section--> */}
              <div>
                <h2>Explore categories for your game</h2>
                <p>Check your masterchef skills on a specific topic</p>

                {/* <!-- Grid showing the categories of topics--> */}
                <div className="categories-grid">
                  {/* <!-- Cards --> */}
                  {categoryInfo.map((category, index) => {
                  
                  return <div className="card" key={"card-" + index} onClick={ () => {
                    props.onNavigateCallback('start-trivia', {
                      selected_category: category.id,
                      show_settings: true,
                    })
                  }}>
                    
                    <div id={category.id}className="icon-container"><i className="material-symbols-rounded card-icon">{category.icon_name}</i></div>
                    <h3>{category.label}</h3>

                  </div>
                      }
                    )
                  }
                  

                </div>
              </div>
            </div>
            {/* <!-- Second Content Section --> */}
            <div className="purple-section">
              <h2>Acknowledgment</h2>
              <p>This website was created for a school project using <a href="https://the-trivia-api.com/">The Trivia API</a>, an API that provides multiple choice quiz questions across a range of categories.</p>
            </div>
          </main>

          <Footer />
    </React.Fragment>
    );
}
