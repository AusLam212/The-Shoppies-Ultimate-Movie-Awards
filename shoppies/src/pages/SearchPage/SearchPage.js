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


function SearchPage() {
    const [search, setSearch] = useState({
        search: "",
        results: []
    });
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            makeSearch();
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [search.search]);

    var initialNominees = JSON.parse(window.localStorage.getItem("nomineeKey")) || [];
    const [nominees, setNominees] = useState({
        nominees: initialNominees,
        winner: "Who will win?!"
    });
    useEffect(() => {
        window.localStorage.setItem("nomineeKey", JSON.stringify(nominees.nominees));
    })

    const [visible, setVisibility] = useState("hidden");

    var handleInputChange = event => {
        var { value } = event.target;
        setSearch({search: value});
    }

    function makeSearch() {
        if (search.search !== "" && search.search !== undefined) {
            API.search(search.search)
                .then(res => {
                    setSearch({results: res.data.Search});
                })
                .catch(err => console.log(err))
        }
    }

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

    function deleteNomination(data) {
        var filteredNominees = nominees.nominees.filter(nom => nom.imdbID !== data.imdbID)
        setNominees({nominees: filteredNominees});
        localStorage.clear();
        localStorage.setItem("nomineeKey", JSON.stringify(nominees.nominees))
    }

    function revealWinner() {
        setVisibility("visible")
    }

    return (
        <div>
            <Title>Welcome to, THE SHOPPIES!</Title>
            <SearchBar onChange={handleInputChange} />
            {nominees.nominees.length === 5 ? (
                <Banner onClick={() => revealWinner()}>
                    <h1 style={{color: "white", visibility: `${visible}`}}>{nominees.nominees[Math.floor(Math.random() * nominees.nominees.length)].Title}</h1>
                </Banner>
            ) : (
                null
            )}
            <div className="row">
                <SearchList>
                    <h2 style={{textAlign: "center", marginTop: "20px", textDecoration: "underline"}}>Search:</h2>
                    {search.results ? (
                        search.results.map(movie => (
                            <SearchListItem key={movie.imdbID} id={movie.imdbID} img={movie.Poster} title={movie.Title} year={movie.Year}>
                                <Button disabled={nominees.nominees.filter(nominee => nominee.imdbID === movie.imdbID).length === 1} onClick={() => nominateMovie(movie)}>Vote!</Button>
                            </SearchListItem>
                        ))
                    ) : (
                        <h3 style={{textAlign: "center"}}>...</h3>
                    )}
                </SearchList>
                <NomineeList>
                    <h2 style={{textAlign: "center", marginTop: "20px", textDecoration: "underline"}}>Nominees: {nominees.nominees.length}/5</h2>
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