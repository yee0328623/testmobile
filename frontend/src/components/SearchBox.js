import React, { useState, useEffect } from "react";
import "./SearchBox.css";

const Autocomplete = ({
  suggestions,
  onSuggestionSelected,
  setSelectedClientLocation,
  clients,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [inputVisible, setInputVisible] = useState(false);

  const setvisibility = () => {
    if (searchTerm.trim() !== "") {
      onSuggestionSelected(searchTerm);

      if (clients.hasOwnProperty(searchTerm)) {
        const client = clients[searchTerm];

        if (client && client.location) {
          setSelectedClientLocation(client.location);
        } else {
          setSelectedClientLocation(null);
          console.error(`Invalid client data for "${searchTerm}"`);
        }
      } else {
        setSelectedClientLocation(null);
        console.error(`Client data not found for "${searchTerm}"`);
      }
    }

    setInputVisible(!inputVisible);

    if (inputVisible === false) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, suggestions]);

  const handleClick = (suggestion) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions("");
    onSuggestionSelected(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (filteredSuggestions.length > 0) {
        const suggestion = filteredSuggestions[activeSuggestion];
        setSearchTerm(suggestion);
        setFilteredSuggestions([]);
        onSuggestionSelected(suggestion);
      }
    } else if (e.keyCode === 38) {
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.keyCode === 40) {
      setActiveSuggestion((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    }
  };

  return (
    <div className={`autocomplete`}>
      <input
        type="text"
        name="clientName"
        placeholder="尋找"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ display: inputVisible ? "block" : "none" }}
      />
      {filteredSuggestions.length > 0 && (
        <div
          className="autocomplete-items"
          style={{ display: inputVisible ? "block" : "none" }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={
                index === activeSuggestion ? "autocomplete-active" : ""
              }
              onClick={() => handleClick(suggestion)}
            >
              <strong>{suggestion.slice(0, searchTerm.length)}</strong>
              {suggestion.slice(searchTerm.length)}
            </div>
          ))}
        </div>
      )}
      <button className="search-button" onClick={setvisibility} type="submit">
        <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </svg>
      </button>
    </div>
  );
};

const SearchBox = ({
  clients,
  onClientSelected,
  setSelectedClientLocation,
}) => {
  const clientNames = clients.map((client) => client.clientName);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="searchBox" autoComplete="off" onSubmit={handleSubmit}>
      <Autocomplete
        suggestions={clientNames}
        onSuggestionSelected={onClientSelected}
        setSelectedClientLocation={setSelectedClientLocation}
        clients={clients}
      />
    </form>
  );
};

export default SearchBox;
