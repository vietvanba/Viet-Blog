import { HiOutlineSpeakerWave } from "react-icons/hi2";

type detail = {
  definition: string | null;
  partOfSpeech: string | null;
  synonyms: string[] | null;
  typeOf: string[] | null;
  derivation: string[] | null;
  hasTypes: string[] | null;
  verbGroup: string[] | null;
  antonyms: string[] | null;
  examples: string[] | null;
  also: string[] | null;
  attribute: string[] | null;
  similarTo: string[] | null;
};
type SearchResponse = {
  word: string;
  frequency: number;
  pronunciation: null | {
    all: string;
  };
  syllables: null | {
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
            <div className="pronunciation">{word?.pronunciation?.all}</div>
            <div className="syllables">
              {`[${word?.syllables?.list.map((w) => ` ${w}`)} ]`}{" "}
            </div>
          </div>
          {word.results.map((d, index) => (
            <>
              <div className="">{`Definition ${index + 1}: (${
                d.partOfSpeech
              }) ${d.definition}`}</div>
              {d.synonyms?.length != 0 && (
                <div>{`Synonyms: ${d.synonyms}`}</div>
              )}
              {d.examples?.length != 0 && (
                <div className="">
                  <div className="">Examples:</div>
                  <ul className="list-disc ml-5 mr-5">
                    {d.examples?.map((e) => (
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
