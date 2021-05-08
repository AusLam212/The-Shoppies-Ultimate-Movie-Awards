import React from "react";
import "./Banner.css"

function Banner(props) {
    return (
        <div id="banner" style={{padding: "5px"}}>
            <h3 id="heading">You've picked 5 nominees!</h3>
            <button onClick={props.onClick} id="winner-button" className="btn" style={{border: "2px solid white", color: "white"}}>See who'll win!</button>
            {props.children}
        </div>
    )
}

export default Banner;