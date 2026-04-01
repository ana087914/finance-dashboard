function SearchBar({ search, setSearch }) {
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search coin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;