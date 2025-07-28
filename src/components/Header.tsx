import searchicon from "../assets/search.svg";
import book from "../assets/book.svg";
import { useState } from "react";

interface HeaderProps {
  word: string;
  setWord: (value: string) => void;
  onSearch: (lang: string, word: string) => void;
}

export function Header({ word, setWord, onSearch }: HeaderProps) {
  const [lang, setLang] = useState("id");

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
            onSearch(lang, word);
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

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="select select-bordered rounded-none border-l-0"
          >
            {/* <option value="en">EN</option> */}
            <option value="zh">CN</option>
            <option value="id">ID</option>
          </select>

          <button type="submit" className="btn btn-neutral rounded-s-none">
            <img src={searchicon} alt="search" />
          </button>
        </form>
      </div>
    </div>
  );
}
