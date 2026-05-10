import "./Common.css";

function Searchbar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Search lands by location..." />
      <button>Search</button>
    </div>
  );
}

export default Searchbar;