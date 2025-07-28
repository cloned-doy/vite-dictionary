import { WordData } from "../types/word";

interface WordResultsProps {
  results: WordData[];
}

export function WordResults({ results }: WordResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="flex flex-col w-full items-center p-4 gap-6">
      {results.map((word, i) => (
        <div
          key={i}
          className="w-full justify-between max-w-4xl bg-base-200 rounded-lg p-4 shadow-md border border-base-300"
        >
          {/* className="w-full max-w-2xl bg-base-200 rounded-xl p-4 shadow-md border border-base-300"
        > */}
          <h2 className="text-2xl font-bold text-primary">
            {word.simplified} ({word.traditional})
          </h2>

          <p className="text-lg text-cyan-400 mt-1">{word.pinyin}</p>

          {word.part_of_speech && (
            <p className="text-sm italic text-gray-400">
              Part of Speech: {word.part_of_speech}
            </p>
          )}

          {/* <div className="mt-3">
            <p className="text-md font-semibold">🇬🇧 English:</p>
            <p className="text-base text-gray-100 whitespace-pre-line">
              {word.english.split("/").filter(Boolean).join("; ")}
            </p>
          </div> */}

          <div className="mt-3">
            {/* <p className="text-md font-semibold">🇮🇩 Indonesian:</p> */}
            <p className="text-base text-gray-100 whitespace-pre-line">
              {word.indonesian.split("/").filter(Boolean).join("; ")}
            </p>
          </div>

          {word.notes && (
            <div className="mt-3">
              <p className="text-sm italic text-yellow-400">
                Note: {word.notes}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
