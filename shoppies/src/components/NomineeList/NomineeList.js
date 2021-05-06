import React from "react";
import "./NomineeList.css";

function NomineeList(props) {
    return (
        <div className="col-sm-12 col-md-6">
            {props.children}
        </div>
    )
}

export default NomineeList;