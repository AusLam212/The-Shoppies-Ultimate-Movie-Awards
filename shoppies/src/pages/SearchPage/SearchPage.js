import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Title from "../../components/Title/Title";
import SearchList from "../../components/SearchList/SearchList";
import SearchListItem from "../../components/SearchListItem/SearchListItem";
import NomineeList from "../../components/NomineeList/NomineeList";
import NomineeItem from "../../components/NomineeItem/NomineeItem";
import Button from "../../components/Button/Button";
import Banner from "../../components/Banner/Banner";
import API from "../../utils/API";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';


function SearchPage() {
    // Used for setting users input in search bar
    const [search, setSearch] = useState({
        search: "",
        results: []
    });
    // When search.search is changes, the makeSearch function will run, but only after the user is done typing
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            makeSearch();
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [search.search]);

    // Sets nominees to localStorage value or an empty array if that is empty
    var initialNominees = JSON.parse(window.localStorage.getItem("nomineeKey")) || [];
    // Used to store users selected nominees
    const [nominees, setNominees] = useState({
        nominees: initialNominees
    });
    useEffect(() => {
        window.localStorage.setItem("nomineeKey", JSON.stringify(nominees.nominees));
    })

    // Dictates if the winning nominee will be visible
    const [visible, setVisibility] = useState("hidden");

    // Handles search bar input change, and sets state to that value
    var handleInputChange = event => {
        var { value } = event.target;
        setSearch({search: value});
    }

    // Makes an API call to the OMDB API whenever the suer changes their input in the search bar
    function makeSearch() {
        if (search.search !== "" && search.search !== undefined) {
            API.search(search.search)
                .then(res => {
                    setSearch({results: res.data.Search});
                })
                .catch(err => console.log(err))
        }
    }

    // Used to set nominees in the nominees state
    function nominateMovie(data) {
        if (nominees.nominees.length < 5) {
            console.log(data);
            setNominees({
                nominees: [
                    ...nominees.nominees,
                    data
                ]
            });
            console.log(nominees.nominees);
        } else {
            alert("You've already made 5 nominations...")
        }
    }

    // Deletes nominees by checking for any repetative ids
    function deleteNomination(data) {
        var filteredNominees = nominees.nominees.filter(nom => nom.imdbID !== data.imdbID)
        setNominees({nominees: filteredNominees});
        localStorage.clear();
        localStorage.setItem("nomineeKey", JSON.stringify(nominees.nominees))
    }

    // Sets visbile state to visible
    function revealWinner() {
        if (visible === "hidden") {
            setVisibility("visible");
        }
    }

    return (
        <div>
            <Title>Welcome to, THE SHOPPIES!</Title>
            <SearchBar onChange={handleInputChange} />
            {/* {Once 5 nominees are picked this banner will be displayed} */}
            {nominees.nominees.length === 5 ? (
                <Banner onClick={() => revealWinner()} disabled={visible === "visible"}>
                    <h1 style={{color: "white", visibility: `${visible}`}}><FontAwesomeIcon icon={faBirthdayCake}/> {nominees.nominees[Math.floor(Math.random() * nominees.nominees.length)].Title} <FontAwesomeIcon icon={faBirthdayCake} /></h1>
                </Banner>
            ) : (
                null
            )}
            <div className="row">
                <SearchList>
                    <h2 style={{textAlign: "center", marginTop: "20px", textDecoration: "underline"}}>Search:</h2>
                    {/* Once the user has started typing in the search bar, this will map throught the data from the API call and pass that data into the SearchListItem component */}
                    {search.results ? (
                        search.results.map(movie => (
                            <SearchListItem key={movie.imdbID} id={movie.imdbID} img={movie.Poster} title={movie.Title} year={movie.Year}>
                                {/* Includes a disabled prop that checks to see if this movie is already in the nominees list */}
                                <Button disabled={nominees.nominees.filter(nominee => nominee.imdbID === movie.imdbID).length === 1} onClick={() => nominateMovie(movie)}>Vote!</Button>
                            </SearchListItem>
                        ))
                    ) : (
                        <h3 style={{textAlign: "center"}}>...</h3>
                    )}
                </SearchList>
                <NomineeList>
                    <h2 style={{textAlign: "center", marginTop: "20px", textDecoration: "underline"}}>Nominees: {nominees.nominees.length}/5</h2>
                    {/* Maps through the nominees state to pass each movie and its data into a NomineeItem component */}
                    {nominees.nominees.length > 0 ? (
                        nominees.nominees.map(nominee => (
                            <NomineeItem key={nominee.imdbID} id={nominee.imdbID} img={nominee.Poster} title={nominee.Title} year={nominee.Year}>
                                <Button disabled={false} onClick={() => deleteNomination(nominee)}>DELETE</Button>
                            </NomineeItem>
                        ))
                        ) : (
                            null
                        )
                    }
                </NomineeList>
            </div>
        </div>
    )

}

export default SearchPage;