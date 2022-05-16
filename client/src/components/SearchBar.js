import { useAppContext } from "../context/appContext";

const SearchBar = () => {
  const { isLoading, search, handleChange, clearSearch } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearch();
  };

  const blur = () => {
    clearSearch();
  };

  return (
    <form>
      <section className="search-container">
        <div className="search-box">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleSearch}
            autoComplete="off"
            onBlur={blur}
          />
          <span></span>
          <button type="submit" onClick={handleSubmit}></button>
        </div>
      </section>
    </form>
  );
};

export default SearchBar;
