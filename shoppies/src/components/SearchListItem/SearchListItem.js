import React from "react";
import "./SearchListItem.css";

function SearchListItem({ img, title}) {
    return (
        <div className="row content">
            <div className="col-sm-12 col-md-6">
                <img alt={title} src={img} onerror="https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg" />
            </div>
            <div className="col-sm-12 col-md-6">
                <div className="row">
                    <div className="col-sm-12"  id="movie-tilte">
                        <h5>{title}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12"  id="movie-description">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchListItem;