import SearchIcon from "~/Icons/searchIcon";

export default function SearchInput() {
  return (
    <div className="search-input">
      <SearchIcon />
      <input type="search" placeholder="Type a title or tag" />
    </div>
  );
}
