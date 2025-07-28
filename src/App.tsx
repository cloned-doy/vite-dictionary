import { useState } from "react";
import { Header } from "./components/Header";
import { WordResults } from "./components/WordResults";
import { useSearchWord } from "./hooks/useSearchWord";

export default function App() {
  const [word, setWord] = useState("");
  const { loading, results, error, searchWord } = useSearchWord();

  const handleSearch = (lang: string, keyword: string) => {
    searchWord(lang, keyword);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Header word={word} setWord={setWord} onSearch={handleSearch} />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}

      <WordResults results={results} />
    </div>
  );
}
