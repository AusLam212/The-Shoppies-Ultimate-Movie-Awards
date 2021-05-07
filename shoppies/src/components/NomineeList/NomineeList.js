import React from "react";
import "./NomineeList.css";

function NomineeList(props) {
    return (
        <div className="col-sm-12 col-md-7" id="nomineeList-container">
            {props.children}
        </div>
    )
}

export default NomineeList;