import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
    return (
        <div>
            <input id="search-bar" type="search" placeholder="Search for your nominations here..." onChange={props.onChange} className="search" />
        </div>
    )
}

export default SearchBar;