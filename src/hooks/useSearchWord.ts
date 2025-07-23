import { useState } from "react";
import { WordData } from "../types/word";

export const useSearchWord = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WordData[]>([]);
  const [audioSrc, setAudioSrc] = useState("");

  const searchWord = async (word: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      const data = await res.json();
      setResults(data);
      const firstAudio = data[0]?.phonetics?.find((p: any) => p.audio)?.audio;
      setAudioSrc(firstAudio || "");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, results, searchWord, audioSrc };
};
