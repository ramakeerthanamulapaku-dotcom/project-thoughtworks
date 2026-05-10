import { useState } from "react";
import axios from "axios";
import "./Common.css";

function SearchBar() {

  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  // SEARCH FUNCTION
  const handleSearch = async (e) => {

    const value = e.target.value;

    setSearch(value);

    try {

      const res = await axios.get(
        `http://localhost:5000/api/services/search?search=${value}`
      );

      setResults(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="search-container">

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {/* RESULTS */}
      <div className="search-results">

        {results.length > 0 ? (

          results.map((service) => (

            <div
              key={service._id}
              className="search-card"
            >
              <h4>{service.name}</h4>

              <p>{service.description}</p>
            </div>

          ))

        ) : (

          search && (
            <p className="no-results">
              No services found
            </p>
          )

        )}

      </div>

    </div>
  );
}

export default SearchBar;