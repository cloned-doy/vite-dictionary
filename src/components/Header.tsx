import searchicon from "../assets/search.svg";
import book from "../assets/book.svg";
// import github from "../assets/github.svg";

interface HeaderProps {
  word: string;
  setWord: (value: string) => void;
  onSearch: () => void;
}

export function Header({ word, setWord, onSearch }: HeaderProps) {
  return (
    <div className="sticky w-full top-0 z-50 bg-base-100 py-2 px-4 shadow-sm">
      <div className="flex justify-between w-full items-center gap-2 max-w-4xl mx-auto">
        <div className="btn">
          <img src={book} alt="Book" />
          <p className="text-xl hidden md:block">Batakko</p>
        </div>

        <form
          className="flex relative w-full max-w-screen-xl"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Search for a word"
            required
            className="input input-bordered w-full max-w-screen-xl rounded-e-none"
          />
          <button type="submit" className="btn btn-neutral rounded-s-none">
            <img src={searchicon} alt="search" />
          </button>
        </form>

        {/* <a
          href="https://github.com/Xeven777"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-circle btn-neutral"
        >
          <img src={github} alt="Github" />
        </a> */}
      </div>
    </div>
  );
}
