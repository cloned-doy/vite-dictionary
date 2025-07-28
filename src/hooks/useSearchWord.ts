import { useState } from "react";
import { WordData } from "../types/word";

export const useSearchWord = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WordData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchWord = async (lang: string, word: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.batakko.com/entries/${lang}=${encodeURIComponent(word)}`;
      const response = await fetch(url);

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const raw = await response.text();
        console.error("❌ Server returned non-JSON:", raw);
        setError("Unexpected response format. Check console.");
        setResults([]);
        return;
      }

      const data: WordData[] = await response.json();
      setResults(data);
    } catch (err) {
      console.error("❌ Fetch or parse error:", err);
      setError("Failed to fetch or parse data.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { loading, results, error, searchWord };
};
