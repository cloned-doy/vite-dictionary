import { useState } from "react";
import { Header } from "./components/Header";
import { WordResults } from "./components/WordResults";
import { useSearchWord } from "./hooks/useSearchWord";

function App() {
  const [word, setWord] = useState("");
  const { loading, results, searchWord } = useSearchWord();

  const handleSearch = () => {
    if (word.trim()) {
      searchWord(word);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center py-4 px-2">
      <Header word={word} setWord={setWord} onSearch={handleSearch} />

      {!loading ? (
        <WordResults results={results} />
      ) : (
        <div className="w-full h-80 flex items-center justify-center">
          <span className="loading loading-infinity loading-lg" />
        </div>
      )}
    </div>
  );
}

export default App;
