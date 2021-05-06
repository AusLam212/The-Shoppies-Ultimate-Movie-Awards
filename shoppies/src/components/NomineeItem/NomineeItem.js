import React from "react";
import "./NomineeItem.css";

function NomineeItem({ img, title, year, children}) {
    return (
        <div className="row content">
            <div className="col-sm-12 col-md-6">
                <img alt={title} src={img ? img : "https://previews.123rf.com/images/rastudio/rastudio1805/rastudio180500246/101756254-movie-camera-reel-hand-drawn-outline-doodle-icon-motion-movie-film-and-cinema-camera-reel-vector-ske.jpg" } />
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