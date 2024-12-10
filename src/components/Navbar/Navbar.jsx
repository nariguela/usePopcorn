import Logo from "./Logo";
import NumResults from "./NumResults";
import SearchBar from "./SearchBar";

export default function Navbar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      <NumResults movies={movies} />
    </nav>
  );
}
