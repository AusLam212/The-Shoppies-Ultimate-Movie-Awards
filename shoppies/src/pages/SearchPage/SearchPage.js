import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Title from "../../components/Title/Title";
import SearchList from "../../components/SearchList/SearchList";
import SearchListItem from "../../components/SearchListItem/SearchListItem";
import NomineeList from "../../components/NomineeList/NomineeList";
import NomineeItem from "../../components/NomineeItem/NomineeItem";
import Button from "../../components/Button/Button";
import API from "../../utils/API";


function SearchPage() {
    const [search, setSearch] = useState({
        earcsh: "",
        results: []
    });
    const [nominees, setNominees] = useState({
        nominees: []
    });
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            makeSearch();
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [search.search]);

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
        console.log(data);
        setNominees({
            nominees: [
                ...nominees.nominees,
                data
            ]
        });
        console.log(nominees.nominees);
    }

    function deleteNomination(data) {
        var filteredNominees = nominees.nominees.filter(nom => nom.imdbID !== data.imdbID)
        setNominees({nominees: filteredNominees});
    }

    return (
        <div>
            <Title>Welcome to, THE SHOPPIES!</Title>
            <SearchBar onChange={handleInputChange} />
            <div className="row">
                <SearchList>
                    {search.results ? (
                        search.results.map(movie => (
                            <SearchListItem key={movie.imdbID} id={movie.imdbID} img={movie.Poster} title={movie.Title} year={movie.Year}>
                                <Button disabled={nominees.nominees.filter((nominee) => nominee.imdbID === movie.imdbID ).length === 1} onClick={() => nominateMovie(movie)}>Vote!</Button>
                            </SearchListItem>
                        ))
                    ) : (
                        <h3>No Results to Display... Make a search!</h3>
                    )}
                </SearchList>
                <NomineeList>
                    {nominees.nominees.length > 0 ? (
                        nominees.nominees.map(nominee => (
                            <NomineeItem key={nominee.imdbID} id={nominee.imdbID} img={nominee.Poster} title={nominee.Title} year={nominee.Year}>
                                <Button disabled={false} onClick={() => deleteNomination(nominee)}>DELETE</Button>
                            </NomineeItem>
                        ))
                        ) : (
                            <h3 style={{textAlign: "center"}}>Your nominations will appear here!</h3>
                        )
                    }
                </NomineeList>
            </div>
        </div>
    )

}

export default SearchPage;