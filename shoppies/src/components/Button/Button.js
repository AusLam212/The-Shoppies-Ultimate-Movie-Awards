import React from "react";
import "./Button.css";

function Button(props) {
    return (
        <div className="row">
            <div className="col-sm-12"  id="vote-button">
                <button disabled={props.disabled} onClick={props.onClick} className="btn" id="btn">{props.children}</button>
            </div>
        </div>
    )
}

export default Button;