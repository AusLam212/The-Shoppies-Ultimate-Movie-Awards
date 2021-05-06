import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Title from "../../components/Title/Title";
import SearchList from "../../components/SearchList/SearchList";
import SearchListItem from "../../components/SearchListItem/SearchListItem";
import NomineeList from "../../components/NomineeList/NomineeList";
import API from "../../utils/API";


function SearchPage() {
    const [search, setSearch] = useState({
        search: "",
        results: []
    });
    const [nominees, setNominees] = useState({
        nominees: [],
        at5Nominees: false
    })
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            console.log(search.search);
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
                .then(() => {
                    console.log(search.results)
                })
                .catch(err => console.log(err))
        }
    }

    var nominateMovie = event => {
        
    }


    return (
        <div>
            <Title>Welcome to, THE SHOPPIES!</Title>
            <SearchBar onChange={handleInputChange} />
            <div className="row">
                <SearchList>
                    {search.results ? (
                        search.results.map(movie => (
                            <SearchListItem img={movie.Poster} title={movie.Title} />
                        ))
                    ) : (
                        <h3>No Results to Display...</h3>
                    )}
                </SearchList>
                <NomineeList>
                    <h1>HELLO!</h1>
                </NomineeList>
            </div>
        </div>
    )

}

export default SearchPage;