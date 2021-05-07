import React from "react";
import "./SearchList.css";

function SearchList(props) {
    return (
        <div className="col-sm-12 col-md-5" id="searchList-container">
            {props.children}
        </div>
    )
}

export default SearchList;