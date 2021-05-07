import React from "react";
import "./SearchListItem.css";

function SearchListItem({ img, title, year, children}) {
    return (
        <div className="row" id="search-content">
            <div className="col-sm-12 col-md-4">
                <img alt={title} src={img} id="search-content-img" />
            </div>
            <div className="col-sm-12 col-md-8">
                <div className="row">
                    <div className="col-sm-12"  id="movie-tilte">
                        <h5>{title}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h6><em>{year}</em></h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchListItem;