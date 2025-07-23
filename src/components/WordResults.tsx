import { useEffect, useRef, useState } from "react";
import { WordData } from "../types/word";
import play from "../assets/play.svg";

interface WordResultsProps {
  results: WordData[];
}

export function WordResults({ results }: WordResultsProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (results.length === 0) return null;

  const word = results[0];
  const audioSrc = word.phonetics.find((p) => p.audio)?.audio || "";

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setPlaying(false);
    }
  }, [audioSrc]);

  return (
    <div className="flex flex-col w-full p-2 my-5 max-w-3xl gap-4">
      {/* Top word + phonetic + audio button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-6xl font-bold">{word.word}</h1>
          <p className="text-xl md:text-2xl text-cyan-400 mt-1">
            {word.phonetics.find((p) => p.text)?.text || ""}
          </p>
        </div>

        {audioSrc && (
          <button
            onClick={handlePlay}
            className="btn btn-circle btn-primary md:btn-lg"
            title="Play pronunciation"
          >
            <img src={play} alt="Play audio" width={30} height={30} />
            <audio ref={audioRef}>
              <source src={audioSrc} type="audio/mp3" />
            </audio>
          </button>
        )}
      </div>

      {/* Definitions */}
      {word.meanings.map((meaning, i) => (
        <div key={i} className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-4xl font-semibold">
            {meaning.partOfSpeech}:
          </h2>

          {meaning.definitions.map((def, j) => (
            <div key={j} className="flex flex-col mb-4">
              <p className="text-lg md:text-xl">
                <span className="opacity-70 text-blue-400 text-sm mr-1">
                  {j + 1}.
                </span>
                {def.definition}
              </p>

              {def.example && (
                <p className="text-base md:text-lg text-gray-400 italic mt-1">
                  Example: {def.example}
                </p>
              )}

              {def.synonyms.length > 0 && (
                <div className="mt-2">
                  <p className="text-lg md:text-xl">Synonyms:</p>
                  <ul className="list-disc list-inside pl-5 text-cyan-300">
                    {def.synonyms.map((syn, idx) => (
                      <li key={idx}>{syn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {def.antonyms.length > 0 && (
                <div className="mt-2">
                  <p className="text-lg md:text-xl">Antonyms:</p>
                  <ul className="list-disc list-inside pl-5 text-red-400">
                    {def.antonyms.map((ant, idx) => (
                      <li key={idx}>{ant}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="separate w-4/6 mx-auto mt-2" />
        </div>
      ))}

      {/* Source URL */}
      {word.sourceUrls?.[0] && (
        <p className="mt-6 text-sm">
          Source:{" "}
          <a
            href={word.sourceUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            {word.sourceUrls[0]}
          </a>
        </p>
      )}
    </div>
  );
}
