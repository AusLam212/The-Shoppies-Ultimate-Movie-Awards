import React from "react";
import "./NomineeItem.css";

function NomineeItem({ img, title, year, children}) {
    return (
        <div className="row content">
            <div className="col-sm-12 col-md-6">
                <img alt={title} src={img ? img : "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg" } />
            </div>
            <div className="col-sm-12 col-md-6">
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

export default NomineeItem;