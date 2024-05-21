import { HiOutlineSpeakerWave } from "react-icons/hi2";

type detail = {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  typeOf: string[];
  derivation: string[];
  hasTypes: string[];
  verbGroup: string[];
  antonyms: string[];
  examples: string[];
  also: string[];
  attribute: string[];
  similarTo: string[];
};
type SearchResponse = {
  word: string;
  frequency: number;
  pronunciation: {
    all: string;
  };
  syllables: {
    count: number;
    list: string[];
  };
  results: detail[];
};
type WordDetailsProps = {
  word: SearchResponse | undefined;
};
export const WordDetails: React.FC<WordDetailsProps> = ({ word }) => {
  return (
    <>
      {word && (
        <>
          <div className=" text-3xl font-bold">{word?.word}</div>
          <div className="flex gap-2 items-center">
            <HiOutlineSpeakerWave />
            <div className="pronunciation">{word?.pronunciation.all}</div>
            <div className="syllables">
              {`[${word?.syllables.list.map((w) => ` ${w}`)} ]`}{" "}
            </div>
          </div>
          {word.results.map((d, index) => (
            <>
              <div className="">{`Definition ${index + 1}: (${
                d.partOfSpeech
              }) ${d.definition}`}</div>
              {d.synonyms.length != 0 && <div>{`Synonyms: ${d.synonyms}`}</div>}
              {d.examples.length != 0 && (
                <div className="">
                  <div className="">Examples:</div>
                  <ul className="list-disc ml-5 mr-5">
                    {d.examples.map((e) => (
                      <li>{`${e}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};
