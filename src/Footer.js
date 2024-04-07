import React from "react";

export default function Footer() {
    // Back to the top function
    function backToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
    }

    // Return the footer section
    return <React.Fragment>
        <footer>
            <button id="back-to-top" onClick={backToTop}><i className="material-symbols-rounded">arrow_upward</i>Back to top</button>
            <p>&copy; 2024 Maiara Lewis Cipriano</p>
        </footer>

    </React.Fragment>
}