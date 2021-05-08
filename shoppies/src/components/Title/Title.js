import React from "react";
import "./Title.css";

function Title(props) {
    return (
        <h1 id="title" style={{padding: "20px"}}>{props.children}</h1>
    )
}

export default Title;